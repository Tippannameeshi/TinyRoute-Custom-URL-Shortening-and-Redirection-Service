import React from "react";
import { formatDate } from "../../utils/formatters";

export const RecentVisitorsTable = ({ visitors = [] }) => {
  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Recent Visitors
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Live visitor activity across all shortened URLs.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl shadow-sm dark:bg-emerald-900/30">
          👥
        </div>
      </div>

      {visitors && visitors.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">

          <table className="min-w-full text-sm">

            <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">

                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4">IP Address</th>
                <th className="px-5 py-4">Browser / OS</th>
                <th className="px-5 py-4">Device</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Referrer</th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

              {visitors.map((v) => (
                <tr
                  key={v.id}
                  className="transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-slate-800/50"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                    {formatDate(v.clicked_at)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 font-mono text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {v.ip_address}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800 dark:text-white">
                        {v.browser}
                      </span>

                      <span className="text-xs text-slate-500">
                        {v.os}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                      {v.device}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-700 dark:text-slate-300">
                    {v.country || "Unknown"}
                  </td>

                  <td className="max-w-xs truncate px-5 py-4 text-slate-600 dark:text-slate-400">
                    {v.referrer || "Direct"}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      ) : (
        <div className="flex h-72 flex-col items-center justify-center">

          <div className="mb-4 text-6xl opacity-40">
            👥
          </div>

          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            No Visitor Activity
          </h4>

          <p className="mt-2 max-w-sm text-center text-sm text-slate-400">
            Visitor logs will appear here once users begin accessing your
            shortened links.
          </p>

        </div>
      )}
    </div>
  );
};