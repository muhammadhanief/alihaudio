import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortIconProps {
    columnKey: string;
    sortConfig: {
        key: string;
        direction: 'asc' | 'desc' | null;
    };
}

export function SortIcon({ columnKey, sortConfig }: SortIconProps) {
    if (sortConfig.key !== columnKey || !sortConfig.direction) {
        return <ArrowUpDown className="h-3 w-3 text-orange-900/30 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    if (sortConfig.direction === 'asc') {
        return <ArrowUp className="h-3 w-3 text-orange-600 inline-block ml-1" />;
    }
    return <ArrowDown className="h-3 w-3 text-orange-600 inline-block ml-1" />;
}
