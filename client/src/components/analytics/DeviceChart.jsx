import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#3b82f6", "#14b8a6", "#f43f5e"];

export const DeviceChart = ({ data = [] }) => {
  const formatted = data.map((item) => ({
    device: item.device || "Desktop",
    clicks: Number(item.count),
  }));

  return (
    <div className="flex h-full flex-col p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Device Types
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Click distribution across visitor devices.
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl shadow-sm dark:bg-blue-900/30">
          💻
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        {formatted.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formatted}
              margin={{
                top: 10,
                right: 20,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="5 5"
                stroke="#CBD5E1"
                opacity={0.35}
              />

              <XAxis
                dataKey="device"
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
                  borderRadius: "12px",
                  color: "#fff",
                  boxShadow: "0 10px 25px rgba(0,0,0,.25)",
                }}
              />

              <Bar
                dataKey="clicks"
                radius={[10, 10, 0, 0]}
                animationDuration={900}
              >
                {formatted.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-4 text-6xl opacity-40">💻</div>

            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              No Device Analytics
            </h4>

            <p className="mt-2 max-w-xs text-center text-sm text-slate-400">
              Device statistics will appear here once users begin visiting your
              shortened links.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};