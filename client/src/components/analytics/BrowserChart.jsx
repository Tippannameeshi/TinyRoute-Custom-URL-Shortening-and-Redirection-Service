import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export const BrowserChart = ({ data = [] }) => {
  const formatted = data.map((item) => ({
    name: item.browser || "Unknown",
    value: Number(item.count),
  }));

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Browser Breakdown
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Distribution of visitors across different browsers.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-xl shadow-sm dark:bg-indigo-900/30">
          🌐
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        {formatted.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formatted}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {formatted.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: "18px",
                  fontSize: "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-4 text-6xl opacity-40">🌐</div>

            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              No Browser Analytics
            </h4>

            <p className="mt-2 max-w-xs text-center text-sm text-slate-400">
              Browser statistics will appear here once users start visiting your
              shortened links.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};