import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const ClickChart = ({ data = [] }) => {
  return (
    <div className="flex h-full flex-col p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Click Trend Analytics
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Daily click activity for your shortened URLs.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl shadow-sm dark:bg-indigo-900/30">
          📈
        </div>

      </div>

      {/* Chart */}

      <div className="h-80 w-full">

        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">

            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: -20,
                bottom: 0,
              }}
            >

              <defs>

                <linearGradient
                  id="colorClicks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#4f46e5"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor="#4f46e5"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="5 5"
                stroke="#CBD5E1"
                opacity={0.35}
              />

              <XAxis
                dataKey="date"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#64748B"
                fontSize={12}
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "none",
                  borderRadius: "14px",
                  color: "#fff",
                  boxShadow:
                    "0 12px 30px rgba(0,0,0,.25)",
                }}
              />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#4F46E5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorClicks)"
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />

            </AreaChart>

          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">

            <div className="mb-5 text-7xl opacity-40">
              📈
            </div>

            <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
              No Click Data Yet
            </h4>

            <p className="mt-2 max-w-sm text-center text-sm text-slate-400">
              Click analytics will be displayed here as soon as users start
              visiting your shortened URLs.
            </p>

          </div>
        )}

      </div>

    </div>
  );
};