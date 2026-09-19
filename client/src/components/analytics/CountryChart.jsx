import React from "react";

export const CountryChart = ({ data = [] }) => {
  const total = data.reduce((acc, item) => acc + Number(item.count), 0);

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Top Countries
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Geographic distribution of your visitors.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl shadow-sm dark:bg-indigo-900/30">
          🌍
        </div>
      </div>

      {data.length > 0 ? (
        <div className="space-y-5 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {data.map((item, idx) => {
            const count = Number(item.count);
            const percentage =
              total > 0 ? Math.round((count / total) * 100) : 0;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:border-indigo-800 dark:hover:bg-slate-800/40"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">
                      {item.country || "Unknown Location"}
                    </h4>

                    <p className="text-xs text-slate-500">
                      {percentage}% of total traffic
                    </p>
                  </div>

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                    {count} Clicks
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-700"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-72 flex-col items-center justify-center">
          <div className="mb-4 text-6xl opacity-40">🌍</div>

          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            No Country Analytics
          </h4>

          <p className="mt-2 max-w-xs text-center text-sm text-slate-400">
            Country statistics will appear here once visitors access your
            shortened links.
          </p>
        </div>
      )}
    </div>
  );
};