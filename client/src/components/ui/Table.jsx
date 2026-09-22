import React from 'react';
import { Skeleton } from './Skeleton';
import { ChevronUp, ChevronDown, Inbox } from 'lucide-react';

export const Table = ({
  columns = [],
  data = [],
  loading = false,
  sortColumn = null,
  sortDirection = 'asc',
  onSort = () => {},
  emptyMessage = 'No records found',
  zebra = false,
  stickyHeader = true,
  className = '',
}) => {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          {/* Header */}
          <thead
            className={`bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-md ${
              stickyHeader ? 'sticky top-0 z-20' : ''
            }`}
          >
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  aria-sort={
                    sortColumn === col.key
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                  }
                  onClick={() => col.sortable && onSort(col.key)}
                  className={`group px-4 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800/80 whitespace-nowrap ${
                    col.sortable
                      ? 'cursor-pointer select-none transition-colors hover:text-slate-900 dark:hover:text-white'
                      : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>

                    {col.sortable && (
                      <>
                        {sortColumn === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-indigo-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                          )
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {loading ? (
              Array.from({ length: 5 }).map((_, row) => (
                <tr key={row}>
                  {columns.map((_, col) => (
                    <td key={col} className="px-4 py-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                    zebra && index % 2 !== 0
                      ? 'bg-slate-50/40 dark:bg-slate-900/40'
                      : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.header}
                      className={`px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 align-middle ${
                        col.cellClassName || ''
                      }`}
                    >
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                      <Inbox className="h-7 w-7 text-slate-400 dark:text-slate-500" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {emptyMessage}
                      </p>

                      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                        Try changing your filters or create a new record.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};