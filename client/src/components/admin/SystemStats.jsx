import React from "react";
import { StatCard } from "../common/StatCard";
import { formatNumber } from "../../utils/formatters";

export const SystemStats = ({ stats = {} }) => {
  const statCards = [
    {
      title: "Total Registered Users",
      value: formatNumber(stats.total_users || 0),
      icon: "👥",
      color: "indigo",
    },
    {
      title: "Total Short URLs",
      value: formatNumber(stats.total_urls || 0),
      icon: "🔗",
      color: "emerald",
    },
    {
      title: "Total System Clicks",
      value: formatNumber(stats.total_clicks || 0),
      icon: "⚡",
      color: "amber",
    },
    {
      title: "Active Short URLs",
      value: formatNumber(stats.active_urls || 0),
      icon: "✅",
      color: "blue",
    },
  ];

  return (
    <section className="relative mb-10">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-cyan-50 blur-3xl opacity-60"></div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          >
            <StatCard
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
            />
          </div>
        ))}
      </div>
    </section>
  );
};