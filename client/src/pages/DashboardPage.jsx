import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useAuth } from '../hooks/useAuth';
import { urlApi } from '../api/urlApi';
import { StatCard } from '../components/common/StatCard';
import { Skeleton } from '../components/ui/Skeleton';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';
import { formatNumber } from '../utils/formatters';
import { BulkUrlModal } from '../components/common/BulkUrlModal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Link2, Plus, Layers, Sparkles, Copy, Check } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data, loading, range, setRange, refetch } = useAnalytics(null, '30d');
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Quick shorten bar state
  const [quickUrl, setQuickUrl] = useState('');
  const [shortenedResult, setShortenedResult] = useState('');
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);

  const handleQuickShorten = async (e) => {
    e.preventDefault();
    if (!quickUrl) return;
    setQuickLoading(true);
    try {
      const res = await urlApi.createUrl({ original_url: quickUrl });
      setShortenedResult(res.data.data.short_url);
      setQuickUrl('');
      refetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to shorten URL');
    } finally {
      setQuickLoading(false);
    }
  };

  const copyQuickResult = () => {
    navigator.clipboard.writeText(shortenedResult);
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-28 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const stats = data?.stats || {};
  const charts = data?.charts || {};
  const recentVisitors = data?.recentVisitors || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Quick Shorten Widget */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workspace Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {user?.first_name || 'Creator'} 👋
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">
              Manage your links, track real-time audience analytics, and grow your campaign reach.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setShowBulkModal(true)}
              variant="secondary"
              icon={Layers}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white"
            >
              Bulk Shorten
            </Button>
            <Link to={ROUTES.URL_CREATE}>
              <Button icon={Plus} className="shadow-lg shadow-indigo-500/30">
                New Short URL
              </Button>
            </Link>
          </div>
        </div>

        {/* Inline Quick Shortener */}
        <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
          <form onSubmit={handleQuickShorten} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="url"
              required
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Paste long URL here for instant Base62 shortening..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <Button type="submit" isLoading={quickLoading} variant="primary" className="bg-indigo-500 hover:bg-indigo-400 text-white">
              Instant Shorten
            </Button>
          </form>

          {shortenedResult && (
            <div className="mt-3 p-3 bg-indigo-950/80 border border-indigo-500/30 rounded-xl flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-300 truncate">{shortenedResult}</span>
              <button
                onClick={copyQuickResult}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-1 rounded-lg inline-flex items-center"
              >
                {quickCopied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {quickCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Short URLs" value={formatNumber(stats.total_urls)} iconType="urls" trend="+14%" />
        <StatCard title="Total Link Clicks" value={formatNumber(stats.total_clicks)} iconType="clicks" trend="+28%" />
        <StatCard title="Active Links" value={formatNumber(stats.active_urls)} iconType="active" trend="+8%" />
        <StatCard title="Expired Links" value={formatNumber(stats.expired_urls)} iconType="expired" trend="0%" />
      </div>

      {/* Analytics Visualizations */}
      <AnalyticsOverview
        charts={charts}
        recentVisitors={recentVisitors}
        range={range}
        onRangeChange={setRange}
      />

      <BulkUrlModal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSuccess={refetch}
      />
    </div>
  );
};
