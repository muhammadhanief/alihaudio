import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
    key: string;
    direction: SortDirection;
}

export function useSortAndFilter<T>(
    data: T[],
    searchKeys: (keyof T)[] = [],
    defaultSortContext?: { key: string; direction: SortDirection }
) {
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig>(defaultSortContext || { key: '', direction: null });

    const toggleSort = (key: string) => {
        let direction: SortDirection = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = null;
        setSortConfig({ key, direction });
    };

    const filteredAndSorted = useMemo(() => {
        let result = [...data];

        // Search phase
        if (search.trim() && searchKeys.length > 0) {
            const q = search.toLowerCase();
            result = result.filter(item => {
                return searchKeys.some(key => {
                    let val = item[key];
                    if (val !== null && val !== undefined) {
                        return String(val).toLowerCase().includes(q);
                    }
                    return false;
                });
            });
        }

        // Sorting phase
        if (sortConfig.key && sortConfig.direction) {
            result.sort((a, b) => {
                let valA: any = a[sortConfig.key as keyof T];
                let valB: any = b[sortConfig.key as keyof T];

                if (valA === null || valA === undefined) valA = '';
                if (valB === null || valB === undefined) valB = '';

                // Try to infer specific type handling (like Date)
                if (sortConfig.key === 'created_at' || sortConfig.key.includes('date')) {
                    valA = valA ? new Date(valA).getTime() : 0;
                    valB = valB ? new Date(valB).getTime() : 0;
                } else if (typeof valA === 'string' && typeof valB === 'string') {
                    valA = valA.toLowerCase();
                    valB = valB.toLowerCase();
                }

                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [data, search, sortConfig, searchKeys]);

    return {
        search,
        setSearch,
        sortConfig,
        toggleSort,
        filteredAndSorted
    };
}
