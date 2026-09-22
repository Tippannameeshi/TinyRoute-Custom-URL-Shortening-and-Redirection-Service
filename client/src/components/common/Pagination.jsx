import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  const buttonClass =
    "flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400";

  return (
    <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-slate-200/70 bg-white/70 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between">

      {/* Page Info */}

      <div className="text-center sm:text-left">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Page{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {currentPage}
          </span>{" "}
          of{" "}
          <span className="font-bold text-slate-900 dark:text-white">
            {totalPages}
          </span>
        </p>
      </div>

      {/* Controls */}

      <div className="flex items-center justify-center gap-2">

        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={buttonClass}
          title="First Page"
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonClass}
          title="Previous"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Desktop Numbers */}

        <div className="hidden items-center gap-2 sm:flex">
          {pages.map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="px-2 text-slate-400 dark:text-slate-600"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`flex h-10 min-w-[40px] items-center justify-center rounded-2xl px-3 text-sm font-bold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
                    : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Mobile */}

        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 sm:hidden">
          {currentPage} / {totalPages}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonClass}
          title="Next"
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={buttonClass}
          title="Last Page"
        >
          <ChevronsRight size={16} />
        </button>

      </div>
    </div>
  );
};