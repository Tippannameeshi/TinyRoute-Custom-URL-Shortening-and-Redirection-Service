import React, { useState, useEffect } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { SystemStats } from '../components/admin/SystemStats';
import { Skeleton } from '../components/ui/Skeleton';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { formatDate } from '../utils/formatters';
import { ShieldAlert, Activity, FileText } from 'lucide-react';

export const AdminDashboardPage = () => {
  const { fetchStats, fetchAuditLogs } = useAdmin();
  const [statsData, setStatsData] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchStats(), fetchAuditLogs({ limit: 15 })])
      .then(([statsRes, logsRes]) => {
        setStatsData(statsRes);
        setAuditLogs(logsRes.logs);
      })
      .finally(() => setLoading(false));
  }, [fetchStats, fetchAuditLogs]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const stats = statsData?.stats || {};
  const charts = statsData?.charts || {};

  const auditColumns = [
    {
      header: 'Timestamp',
      key: 'created_at',
      render: (val) => <span className="text-[11px]">{formatDate(val)}</span>
    },
    {
      header: 'Action',
      key: 'action',
      render: (val) => <Badge variant="info">{val}</Badge>
    },
    {
      header: 'User Email',
      key: 'email',
      render: (val) => <span className="font-semibold text-slate-900 dark:text-white">{val || 'System / Guest'}</span>
    },
    {
      header: 'IP Address',
      key: 'ip_address',
      render: (val) => <span className="font-mono text-xs">{val || '127.0.0.1'}</span>
    },
    {
      header: 'Details',
      key: 'details',
      render: (val) => <span className="truncate max-w-xs">{val}</span>
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Enterprise Admin Control</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Global system monitoring, user administration & security audit logs</p>
        </div>
        <Badge variant="admin" className="px-3 py-1 text-xs font-bold">
          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> System Administrator
        </Badge>
      </div>

      <SystemStats stats={stats} />

      <AnalyticsOverview charts={charts} />

      {/* Security Audit Logs Section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Security & Action Audit Logs</h3>
        </div>
        <Table columns={auditColumns} data={auditLogs} emptyMessage="No audit logs recorded yet" />
      </div>
    </div>
  );
};
