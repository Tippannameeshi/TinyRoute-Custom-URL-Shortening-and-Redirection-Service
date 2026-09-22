import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Link,
  MousePointerClick,
  CheckCircle2,
  Clock,
  Activity,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";

export const StatCard = ({
  title,
  value = 0,
  iconType = "urls",
  trend = "+0%",
  subtitle = "",
  loading = false,
}) => {
  const iconMap = {
    urls: {
      icon: Link,
      gradient: "from-indigo-500 via-violet-500 to-cyan-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      text: "text-indigo-600 dark:text-indigo-400",
    },

    clicks: {
      icon: MousePointerClick,
      gradient: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      text: "text-emerald-600 dark:text-emerald-400",
    },

    active: {
      icon: CheckCircle2,
      gradient: "from-sky-500 to-cyan-500",
      bg: "bg-sky-50 dark:bg-sky-950/30",
      text: "text-sky-600 dark:text-sky-400",
    },

    expired: {
      icon: Clock,
      gradient: "from-rose-500 to-red-500",
      bg: "bg-rose-50 dark:bg-rose-950/30",
      text: "text-rose-600 dark:text-rose-400",
    },

    activity: {
      icon: Activity,
      gradient: "from-purple-500 to-fuchsia-500",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      text: "text-purple-600 dark:text-purple-400",
    },

    users: {
      icon: Users,
      gradient: "from-amber-500 to-orange-500",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      text: "text-amber-600 dark:text-amber-400",
    },
  };

  const item = iconMap[iconType] || iconMap.urls;
  const Icon = item.icon;

  const positive = trend.toString().startsWith("+");
  const numericValue =
    typeof value === "number" ? value : parseFloat(value) || 0;
  const formattedValue = new Intl.NumberFormat("en-US").format(numericValue);

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card
        hover
        className="relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)]"
      >
        {/* Glow */}

        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--color-brand)]/10 blur-3xl" />

        {/* Gradient Line */}

        <div className="absolute left-0 top-0 h-0.5 w-full bg-[var(--color-brand)]" />

        <div className="relative flex justify-between items-start">
          <div className="space-y-2">
            <p className="eyebrow">{title}</p>

            {loading ? (
              <>
                <div className="w-24 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="w-20 h-3 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  {formattedValue}
                </h2>

                {subtitle && (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {subtitle}
                  </p>
                )}
              </>
            )}
          </div>

          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.08,
            }}
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-brand-soft)] shadow-[var(--shadow-sm)]"
          >
            <div
              className={`
                h-10
                w-10
                rounded-lg
                flex
                items-center
                justify-center
                bg-[var(--color-brand)]
                text-[var(--color-bg)]
                shadow-[var(--shadow-sm)]
              `}
            >
              <Icon size={22} />
            </div>
          </motion.div>
        </div>

        {!loading && trend && (
          <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
            <div
              className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-xs
                font-bold
                ${
                  positive
                    ? "bg-[color-mix(in_srgb,var(--color-success)_12%,transparent)] text-[var(--color-success)]"
                    : "bg-[color-mix(in_srgb,var(--color-danger)_12%,transparent)] text-[var(--color-danger)]"
                }
              `}
            >
              {positive ? (
                <TrendingUp size={14} className="mr-1" />
              ) : (
                <TrendingDown size={14} className="mr-1" />
              )}

              {trend}
            </div>

            <span className="text-[11px] text-[var(--color-text-subtle)]">
              Last 30 days
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};
