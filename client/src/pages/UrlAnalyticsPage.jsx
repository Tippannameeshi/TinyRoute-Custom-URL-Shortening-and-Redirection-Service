import React from 'react';
import { useParams } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import { Skeleton } from '../components/ui/Skeleton';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatNumber, formatDate } from '../utils/formatters';
import { ExternalLink, Lock, Calendar, Download } from 'lucide-react';

export const UrlAnalyticsPage = () => {
  const { id } = useParams();
  const { data, loading, range, setRange } = useAnalytics(id, '30d');

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const urlRecord = data?.url || {};
  const charts = data?.charts || {};
  const recentVisitors = data?.recentVisitors || [];

  const handleExportCsv = () => {
    if (!recentVisitors || recentVisitors.length === 0) return;
    const headers = ['ID', 'IP Address', 'Browser', 'OS', 'Device', 'Country', 'Referrer', 'Timestamp'];
    const rows = recentVisitors.map(v => [
      v.id,
      v.ip_address,
      v.browser,
      v.os,
      v.device,
      v.country,
      `"${v.referrer}"`,
      v.clicked_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `analytics_${urlRecord.short_code}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header Metadata Card */}
      <Card className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {urlRecord.title || urlRecord.short_code}
              </h1>
              {urlRecord.password_hash && <Badge variant="favorite"><Lock className="w-3 h-3 mr-1" /> Password</Badge>}
              {urlRecord.is_active ? <Badge variant="active">Active</Badge> : <Badge variant="disabled">Disabled</Badge>}
            </div>

            <a
              href={urlRecord.short_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center"
            >
              {urlRecord.short_url}
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xl">
              Destination: {urlRecord.original_url}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportCsv}>
              Export Analytics CSV
            </Button>
          </div>
        </div>
      </Card>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Clicks" value={formatNumber(urlRecord.click_count)} iconType="clicks" trend="+24%" />
        <StatCard title="Click Limit" value={urlRecord.max_clicks ? formatNumber(urlRecord.max_clicks) : 'Unlimited'} iconType="urls" trend="Fixed" />
        <StatCard title="Created Date" value={formatDate(urlRecord.created_at)} iconType="active" trend="Recorded" />
      </div>

      {/* Visual Charts Component */}
      <AnalyticsOverview
        charts={charts}
        recentVisitors={recentVisitors}
        range={range}
        onRangeChange={setRange}
      />
    </div>
  );
};
