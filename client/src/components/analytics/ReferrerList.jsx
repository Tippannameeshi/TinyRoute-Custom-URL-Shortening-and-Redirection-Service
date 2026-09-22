import React from "react";

export const ReferrerList = ({ data = [] }) => {
  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Top Referrers
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Discover where your visitors are coming from.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-2xl shadow-sm dark:bg-cyan-900/30">
          🔗
        </div>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-700 dark:bg-slate-800/40 dark:hover:border-cyan-700 dark:hover:bg-slate-800"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm text-slate-800 dark:text-slate-200">
                  {item.referrer || "Direct / None"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Traffic Source
                </p>
              </div>

              <span className="ml-4 inline-flex shrink-0 rounded-full bg-cyan-100 px-4 py-1.5 text-xs font-bold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300">
                {item.count} Clicks
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-72 flex-col items-center justify-center">
          <div className="mb-4 text-6xl opacity-40">
            🔗
          </div>

          <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            No Referrer Data
          </h4>

          <p className="mt-2 max-w-sm text-center text-sm text-slate-400">
            Referrer analytics will appear here once visitors access your links
            from external websites or search engines.
          </p>
        </div>
      )}
    </div>
  );
};