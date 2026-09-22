import React from "react";
import { useParams } from "react-router-dom";
import { useAnalytics } from "../hooks/useAnalytics";
import { Skeleton } from "../components/ui/Skeleton";
import { AnalyticsOverview } from "../components/analytics/AnalyticsOverview";
import { StatCard } from "../components/common/StatCard";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { formatNumber, formatDate } from "../utils/formatters";

import {
  ExternalLink,
  Lock,
  Calendar,
  Download,
  MousePointerClick,
  Link2,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export const UrlAnalyticsPage = () => {
  const { id } = useParams();

  const { data, loading, range, setRange } = useAnalytics(id, "30d");

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 rounded-3xl" />
        <Skeleton className="h-32 rounded-3xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    );
  }

  const urlRecord = data?.url || {};
  const charts = data?.charts || {};
  const recentVisitors = data?.recentVisitors || [];

  const handleExportCsv = () => {
    if (!recentVisitors.length) return;

    const headers = [
      "ID",
      "IP Address",
      "Browser",
      "OS",
      "Device",
      "Country",
      "Referrer",
      "Timestamp",
    ];

    const rows = recentVisitors.map((v) => [
      v.id,
      v.ip_address,
      v.browser,
      v.os,
      v.device,
      v.country,
      `"${v.referrer}"`,
      v.clicked_at,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encoded = encodeURI(csv);

    const link = document.createElement("a");

    link.href = encoded;
    link.download = `analytics_${urlRecord.short_code}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-700 to-sky-600 p-8 shadow-2xl text-white">
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold">
              <Sparkles size={14} />
              URL Analytics Dashboard
            </div>

            <h1 className="mt-4 text-4xl font-black">
              {urlRecord.title || urlRecord.short_code}
            </h1>

            <p className="mt-2 text-indigo-100">
              Track performance, clicks, visitors and traffic insights.
            </p>
          </div>

          <Button
            icon={Download}
            onClick={handleExportCsv}
            className="bg-white text-indigo-700 hover:bg-indigo-50"
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* URL Details */}

      <Card className="rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {urlRecord.password_hash && (
                <Badge variant="favorite">
                  <Lock className="w-3 h-3 mr-1" />
                  Password Protected
                </Badge>
              )}

              {urlRecord.is_active ? (
                <Badge variant="active">Active</Badge>
              ) : (
                <Badge variant="disabled">Disabled</Badge>
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Short URL
              </p>

              <a
                href={urlRecord.short_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-indigo-600 hover:underline"
              >
                {urlRecord.short_url}

                <ExternalLink size={18} />
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Destination
              </p>

              <p className="mt-1 text-sm break-all text-slate-600 dark:text-slate-300">
                {urlRecord.original_url}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-2xl bg-indigo-50 dark:bg-slate-800 p-5">
              <MousePointerClick className="mb-3 text-indigo-600" />

              <p className="text-sm text-slate-500">Total Clicks</p>

              <h2 className="text-3xl font-black">
                {formatNumber(urlRecord.click_count)}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-50 dark:bg-slate-800 p-5">
              <Calendar className="mb-3 text-emerald-600" />

              <p className="text-sm text-slate-500">Created</p>

              <h2 className="text-lg font-bold">
                {formatDate(urlRecord.created_at)}
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-slate-800 p-5">
              <Link2 className="mb-3 text-orange-600" />

              <p className="text-sm text-slate-500">Click Limit</p>

              <h2 className="text-2xl font-black">
                {urlRecord.max_clicks
                  ? formatNumber(urlRecord.max_clicks)
                  : "Unlimited"}
              </h2>
            </div>

            <div className="rounded-2xl bg-sky-50 dark:bg-slate-800 p-5">
              <ShieldCheck className="mb-3 text-sky-600" />

              <p className="text-sm text-slate-500">Status</p>

              <h2 className="text-xl font-bold">
                {urlRecord.is_active ? "Operational" : "Disabled"}
              </h2>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          title="Total Clicks"
          value={formatNumber(urlRecord.click_count)}
          iconType="clicks"
          trend="+24%"
        />

        <StatCard
          title="Maximum Clicks"
          value={
            urlRecord.max_clicks
              ? formatNumber(urlRecord.max_clicks)
              : "Unlimited"
          }
          iconType="urls"
          trend="Configured"
        />

        <StatCard
          title="Created"
          value={formatDate(urlRecord.created_at)}
          iconType="active"
          trend="Live"
        />
      </div>

      {/* Analytics */}

      <Card className="rounded-3xl p-6">
        <div className="mb-6 flex items-center gap-3">
          <BarChart3 className="text-indigo-600" />

          <div>
            <h2 className="text-xl font-bold">Traffic Analytics</h2>

            <p className="text-sm text-slate-500">
              Visitor behaviour and click trends.
            </p>
          </div>
        </div>

        <AnalyticsOverview
          charts={charts}
          recentVisitors={recentVisitors}
          range={range}
          onRangeChange={setRange}
        />
      </Card>
    </div>
  );
};
