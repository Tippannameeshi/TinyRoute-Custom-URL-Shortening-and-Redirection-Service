import React from "react";
import {
  formatDate,
  formatNumber,
  truncateUrl,
} from "../../utils/formatters";

export const UrlTable = ({ urls = [], onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">

          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">

              <th className="px-6 py-4 text-left">ID</th>

              <th className="px-6 py-4 text-left">Title / Code</th>

              <th className="px-6 py-4 text-left">Short URL</th>

              <th className="px-6 py-4 text-left">Target URL</th>

              <th className="px-6 py-4 text-center">Clicks</th>

              <th className="px-6 py-4 text-left">Created</th>

              <th className="px-6 py-4 text-right">Actions</th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {urls.map((u) => (
              <tr
                key={u.id}
                className="group transition-colors duration-300 hover:bg-indigo-50/60 dark:hover:bg-slate-800/60"
              >
                <td className="px-6 py-5">
                  <span className="rounded-lg bg-slate-100 px-2 py-1 font-mono text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    #{u.id}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {u.title || u.short_code}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <a
                    href={u.short_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 font-mono text-xs font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white dark:bg-indigo-950/50 dark:text-indigo-300 dark:hover:bg-indigo-600"
                  >
                    🔗 {u.short_code}
                  </a>
                </td>

                <td className="max-w-xs px-6 py-5">
                  <span
                    className="block truncate text-sm text-slate-600 dark:text-slate-300"
                    title={u.original_url}
                  >
                    {truncateUrl(u.original_url, 40)}
                  </span>
                </td>

                <td className="px-6 py-5 text-center">
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    {formatNumber(u.click_count)}
                  </span>
                </td>

                <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(u.created_at)}
                </td>

                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() => onDelete(u.id)}
                    className="rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
};