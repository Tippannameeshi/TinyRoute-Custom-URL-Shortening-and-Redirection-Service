import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useAnalytics } from "../hooks/useAnalytics";
import { useAuth } from "../hooks/useAuth";
import { urlApi } from "../api/urlApi";

import { StatCard } from "../components/common/StatCard";
import { Skeleton } from "../components/ui/Skeleton";
import { Card } from "../components/ui/Card";
import { AnalyticsOverview } from "../components/analytics/AnalyticsOverview";
import { BulkUrlModal } from "../components/common/BulkUrlModal";
import { Button } from "../components/ui/Button";

import { ROUTES } from "../constants/routes";
import { formatNumber } from "../utils/formatters";
import { toast } from "../components/ui/Toast";

import {
  Plus,
  Layers,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  Link2,
  MousePointerClick,
  Rocket,
} from "lucide-react";

export const DashboardPage = () => {
  const { user } = useAuth();

  const { data, loading, range, setRange, refetch } = useAnalytics(null, "30d");

  const [showBulkModal, setShowBulkModal] = useState(false);

  const [quickUrl, setQuickUrl] = useState("");

  const [shortenedResult, setShortenedResult] = useState("");

  const [quickLoading, setQuickLoading] = useState(false);

  const [quickCopied, setQuickCopied] = useState(false);

  const handleQuickShorten = async (e) => {
    e.preventDefault();

    if (!quickUrl.trim()) return;

    setQuickLoading(true);

    try {
      const res = await urlApi.createUrl({
        original_url: quickUrl,
      });

      setShortenedResult(res.data.data.short_url);

      toast.success("URL shortened successfully.");

      setQuickUrl("");

      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to shorten URL.");
    } finally {
      setQuickLoading(false);
    }
  };

  const copyQuickResult = async () => {
    try {
      await navigator.clipboard.writeText(shortenedResult);

      setQuickCopied(true);

      toast.success("Copied to clipboard");

      setTimeout(() => {
        setQuickCopied(false);
      }, 2000);
    } catch {
      toast.error("Unable to copy.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-64 rounded-3xl" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-40 rounded-3xl" />
          ))}
        </div>

        <Skeleton className="h-[500px] rounded-3xl" />
      </div>
    );
  }

  const stats = data?.stats || {};

  const charts = data?.charts || {};

  const recentVisitors = data?.recentVisitors || [];

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl"
      >
        {/* Background */}

        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />

          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.08),transparent_35%)]" />
        </div>

        <div className="relative z-10 p-8 lg:p-10">
          <div className="flex flex-col xl:flex-row justify-between gap-10">
            {/* LEFT */}

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-indigo-300 text-sm font-semibold">
                <Rocket className="w-4 h-4" />
                TinyRoute Workspace
              </div>

              <h1 className="mt-6 text-4xl lg:text-5xl font-black leading-tight text-white">
                Welcome back,
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {user?.first_name || "Creator"}
                </span>
              </h1>

              <p className="mt-5 text-slate-300 leading-8 max-w-2xl">
                Manage every short URL, monitor real-time analytics, understand
                audience behaviour, and scale campaigns from one beautiful
                dashboard.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={ROUTES.URL_CREATE}>
                  <Button
                    icon={Plus}
                    className="bg-indigo-600 hover:bg-indigo-500"
                  >
                    Create Short URL
                  </Button>
                </Link>

                <Button
                  variant="secondary"
                  icon={Layers}
                  onClick={() => setShowBulkModal(true)}
                >
                  Bulk Shortener
                </Button>
              </div>
            </div>
            {/* RIGHT SIDE */}

            <div className="xl:w-[420px]">
              {/* Hero Stats */}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                      <Link2 className="w-6 h-6 text-indigo-300" />
                    </div>

                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>

                  <h3 className="mt-5 text-3xl font-black text-white">
                    {formatNumber(stats.total_urls)}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">Total URLs</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <MousePointerClick className="w-6 h-6 text-cyan-300" />
                    </div>

                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>

                  <h3 className="mt-5 text-3xl font-black text-white">
                    {formatNumber(stats.total_clicks)}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">Total Clicks</p>
                </div>
              </div>

              {/* Quick Shortener */}

              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center">
                    <Sparkles className="text-white w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      Instant URL Shortener
                    </h3>

                    <p className="text-xs text-slate-400">
                      Create links in seconds
                    </p>
                  </div>
                </div>

                <form onSubmit={handleQuickShorten} className="space-y-4">
                  <input
                    type="url"
                    required
                    value={quickUrl}
                    onChange={(e) => setQuickUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <Button
                    type="submit"
                    isLoading={quickLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500"
                  >
                    Shorten URL
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>

                {shortenedResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 p-4"
                  >
                    <p className="text-xs uppercase tracking-widest text-green-300 mb-2">
                      Short URL
                    </p>

                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-semibold text-white">
                        {shortenedResult}
                      </span>

                      <button
                        onClick={copyQuickResult}
                        className="rounded-lg bg-indigo-600 hover:bg-indigo-500 p-2 transition"
                      >
                        {quickCopied ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      {/* ===================== */}
      {/* QUICK ACTIONS */}
      {/* ===================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Shortener */}
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30">
                <Link2 className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Instant URL Shortener
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Paste any long URL and create a secure short link instantly.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleQuickShorten} className="space-y-4">
              <input
                type="url"
                required
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                placeholder="https://example.com/very/long/url..."
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  px-5
                  py-4
                  text-sm
                  text-slate-900
                  dark:text-white
                  placeholder:text-slate-400
                  focus:border-indigo-500
                  focus:ring-4
                  focus:ring-indigo-500/20
                  outline-none
                  transition
                "
              />

              <Button
                type="submit"
                isLoading={quickLoading}
                className="w-full h-12"
              >
                Shorten URL
              </Button>
            </form>

            {shortenedResult && (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-900/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="overflow-hidden">
                    <p className="text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Generated URL
                    </p>

                    <p className="mt-2 truncate font-mono text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {shortenedResult}
                    </p>
                  </div>

                  <button
                    onClick={copyQuickResult}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-emerald-600
                      px-4
                      py-2
                      text-white
                      hover:bg-emerald-700
                      transition
                    "
                  >
                    {quickCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Actions */}

        <div className="space-y-6">
          <Card className="rounded-3xl">
            <div className="space-y-5">
              <h3 className="text-lg font-bold">Quick Actions</h3>

              <Link to={ROUTES.URL_CREATE}>
                <Button className="w-full h-12" icon={Plus}>
                  Create New URL
                </Button>
              </Link>

              <Button
                variant="secondary"
                className="w-full h-12"
                icon={Layers}
                onClick={() => setShowBulkModal(true)}
              >
                Bulk URL Upload
              </Button>
            </div>
          </Card>

          <Card className="rounded-3xl">
            <div className="space-y-4">
              <h3 className="font-bold">Tips</h3>

              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li>• Create branded custom aliases.</li>

                <li>• Enable password protection.</li>

                <li>• Set expiration dates.</li>

                <li>• Monitor analytics in real-time.</li>

                <li>• Generate QR Codes automatically.</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
      {/* ===================== */}
      {/* KPI CARDS */}
      {/* ===================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total URLs"
          value={formatNumber(stats.total_urls || 0)}
          iconType="urls"
          trend="+14%"
        />

        <StatCard
          title="Total Clicks"
          value={formatNumber(stats.total_clicks || 0)}
          iconType="clicks"
          trend="+28%"
        />

        <StatCard
          title="Active URLs"
          value={formatNumber(stats.active_urls || 0)}
          iconType="active"
          trend="+8%"
        />

        <StatCard
          title="Expired URLs"
          value={formatNumber(stats.expired_urls || 0)}
          iconType="expired"
          trend="0%"
        />
      </div>

      {/* ===================== */}
      {/* ANALYTICS */}
      {/* ===================== */}

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Analytics Dashboard
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                View click trends, visitors, devices and traffic insights.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {["7d", "30d", "90d"].map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`
                    rounded-xl
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    transition-all
                    ${
                      range === item
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-100 dark:hover:bg-slate-700"
                    }
                  `}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <AnalyticsOverview
            charts={charts}
            recentVisitors={recentVisitors}
            range={range}
            onRangeChange={setRange}
          />
        </div>
      </div>

      {/* ===================== */}
      {/* BULK URL MODAL */}
      {/* ===================== */}

      <BulkUrlModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSuccess={refetch}
      />
    </div>
  );
};
