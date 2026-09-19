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
    <div className={`w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-xs ${className}`}>
      <div className="overflow-x-auto max-w-full">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300 border-collapse">
          <thead className={`text-[11px] font-bold uppercase tracking-wider bg-slate-50/90 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xs ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key || col.header}
                  onClick={() => col.sortable && onSort(col.key)}
                  className={`px-4 py-3.5 whitespace-nowrap ${
                    col.sortable
                      ? 'cursor-pointer select-none hover:text-slate-900 dark:hover:text-white transition-colors'
                      : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center space-x-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-slate-400">
                        {sortColumn === col.key ? (
                          sortDirection === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-indigo-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                          )
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => (
                <tr key={n}>
                  {columns.map((_, idx) => (
                    <td key={idx} className="px-4 py-3.5 whitespace-nowrap">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`transition-colors hover:bg-slate-50/90 dark:hover:bg-slate-800/50 ${
                    zebra && rowIndex % 2 === 1 ? 'bg-slate-50/40 dark:bg-slate-900/40' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key || col.header}
                      className={`px-4 py-3.5 text-slate-700 dark:text-slate-200 text-sm ${col.cellClassName || ''}`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-14 text-center text-slate-400 dark:text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Inbox className="w-8 h-8 stroke-1 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
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
