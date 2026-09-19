import React from 'react';
import CountUp from 'react-countup';
import {
  TrendingUp,
  TrendingDown,
  Link,
  MousePointerClick,
  CheckCircle2,
  Clock,
  Activity,
  Users,
} from 'lucide-react';
import { Card } from '../ui/Card';

export const StatCard = ({
  title,
  value = 0,
  iconType = 'urls',
  trend = '+0%',
  subtitle = '',
  loading = false,
}) => {
  const iconMap = {
    urls: {
      icon: Link,
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/60',
    },
    clicks: {
      icon: MousePointerClick,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    },
    active: {
      icon: CheckCircle2,
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-400 border-sky-200/60 dark:border-sky-800/60',
    },
    expired: {
      icon: Clock,
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60',
    },
    activity: {
      icon: Activity,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/60',
    },
    users: {
      icon: Users,
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60',
    },
  };

  const item = iconMap[iconType] || iconMap.urls;
  const Icon = item.icon;

  const positive = trend.toString().startsWith('+');
  const numericVal = typeof value === 'number' ? value : parseFloat(value) || 0;

  return (
    <Card hover className="relative overflow-hidden group">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
            {title}
          </p>

          {loading ? (
            <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse my-2" />
          ) : (
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              <CountUp end={numericVal} duration={1.2} separator="," />
            </h3>
          )}

          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 shrink-0 ${item.color}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {!loading && trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-bold ${
              positive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'
            }`}
          >
            {positive ? (
              <TrendingUp className="mr-1 h-3 h-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 h-3" />
            )}
            {trend}
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            vs previous 30 days
          </span>
        </div>
      )}
    </Card>
  );
};