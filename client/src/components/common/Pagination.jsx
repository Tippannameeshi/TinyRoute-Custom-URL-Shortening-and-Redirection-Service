import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-5">
      {/* Page Info */}
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing page{' '}
        <span className="font-bold text-slate-900 dark:text-white">
          {currentPage}
        </span>{' '}
        of{' '}
        <span className="font-bold text-slate-900 dark:text-white">
          {totalPages}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1">
        {/* First */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Previous page"
          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {pages.map((page, index) =>
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-slate-400 dark:text-slate-600 text-xs"
              >
                ...
              </span>
            ) : (
              <button
                type="button"
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-9 h-9 px-2 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Mobile Page Pill */}
        <span className="sm:hidden px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold">
          {currentPage} / {totalPages}
        </span>

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Next page"
          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
          className="p-2 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};