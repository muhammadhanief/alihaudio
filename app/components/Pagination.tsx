import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number | 'all';
    onItemsPerPageChange: (items: number | 'all') => void;
    totalItems: number;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
    totalItems
}: PaginationProps) {
    if (totalItems === 0) return null;

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-900/50 uppercase tracking-widest">
                <span>Tampilkan:</span>
                <select
                    value={itemsPerPage}
                    onChange={(e) => {
                        const val = e.target.value;
                        onItemsPerPageChange(val === 'all' ? 'all' : Number(val));
                    }}
                    className="bg-white border border-orange-200/50 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-orange-500/20 text-orange-900 cursor-pointer"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value="all">Semua</option>
                </select>
                <span className="hidden sm:inline">| Total: {totalItems} Data</span>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg border border-orange-200/50 text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Halaman Pertama"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg border border-orange-200/50 text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Halaman Sebelumnya"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1">
                        {generatePageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && onPageChange(page)}
                                disabled={page === '...'}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${page === currentPage
                                        ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                                        : page === '...'
                                            ? 'text-orange-900/40 cursor-default'
                                            : 'border border-orange-200/50 text-orange-700 hover:bg-orange-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg border border-orange-200/50 text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Halaman Selanjutnya"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg border border-orange-200/50 text-orange-600 hover:bg-orange-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Halaman Terakhir"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
