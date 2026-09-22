import React from "react";
import { ClickChart } from "./ClickChart";
import { BrowserChart } from "./BrowserChart";
import { DeviceChart } from "./DeviceChart";
import { CountryChart } from "./CountryChart";
import { OSChart } from "./OSChart";
import { ReferrerList } from "./ReferrerList";
import { RecentVisitorsTable } from "./RecentVisitorsTable";

const cardClass =
  "overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900";

export const AnalyticsOverview = ({
  charts = {},
  recentVisitors = [],
  range = "30d",
  onRangeChange,
}) => {
  return (
    <div className="space-y-8">
      {onRangeChange && (
        <div className={`${cardClass} relative p-6`}>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 opacity-80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Analytics Performance Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Monitor traffic, visitor behaviour, and platform performance.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["7d", "30d", "90d"].map((r) => (
                <button
                  key={r}
                  onClick={() => onRangeChange(r)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    range === r
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-indigo-300/40"
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  Last {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={`${cardClass} hover:shadow-xl`}>
        <ClickChart data={charts.clicksTrend} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className={cardClass}>
          <BrowserChart data={charts.browsers} />
        </div>

        <div className={cardClass}>
          <DeviceChart data={charts.devices} />
        </div>

        <div className={cardClass}>
          <CountryChart data={charts.countries} />
        </div>

        <div className={cardClass}>
          <OSChart data={charts.osList} />
        </div>
      </div>

      <div className={cardClass}>
        <ReferrerList data={charts.referrers} />
      </div>

      <div className={cardClass}>
        <RecentVisitorsTable visitors={recentVisitors} />
      </div>
    </div>
  );
};