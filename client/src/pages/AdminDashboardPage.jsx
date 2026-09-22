import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  RefreshCw,
  FileText,
} from 'lucide-react';

import { useAdmin } from '../hooks/useAdmin';

import { SystemStats } from '../components/admin/SystemStats';
import { AnalyticsOverview } from '../components/analytics/AnalyticsOverview';

import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';

import { formatDate } from '../utils/formatters';

export const AdminDashboardPage = () => {
  const { fetchStats, fetchAuditLogs } = useAdmin();

  const [statsData, setStatsData] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async (showRefresh = false) => {
    try {
      setError(null);

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [statsRes, logsRes] = await Promise.all([
        fetchStats(),
        fetchAuditLogs({ limit: 15 }),
      ]);

      setStatsData(statsRes);
      setAuditLogs(logsRes?.logs || []);
    } catch (err) {
      console.error(err);
      setError('Unable to load administrator dashboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchStats, fetchAuditLogs]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const stats = statsData?.stats || {};
  const charts = statsData?.charts || {};

  const auditColumns = [
    {
      header: 'Timestamp',
      key: 'created_at',
      render: (value) => (
        <span className="text-xs">
          {formatDate(value)}
        </span>
      ),
    },
    {
      header: 'Action',
      key: 'action',
      render: (value) => (
        <Badge variant="admin">
          {value}
        </Badge>
      ),
    },
    {
      header: 'User',
      key: 'email',
      render: (value) => (
        <span className="font-semibold text-slate-900 dark:text-white">
          {value || 'System'}
        </span>
      ),
    },
    {
      header: 'IP Address',
      key: 'ip_address',
      render: (value) => (
        <span className="font-mono text-xs">
          {value || '-'}
        </span>
      ),
    },
    {
      header: 'Details',
      key: 'details',
      render: (value) => (
        <div className="max-w-sm truncate">
          {value || '-'}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Enterprise Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor platform health, users, analytics and security events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="admin" size="lg">
            <ShieldAlert className="mr-1 h-4 w-4" />
            Administrator
          </Badge>

          <Button
            variant="outline"
            size="sm"
            icon={RefreshCw}
            isLoading={refreshing}
            onClick={() => loadDashboard(true)}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <Card className="border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30">
          <p className="text-sm text-rose-600 dark:text-rose-400">
            {error}
          </p>
        </Card>
      )}

      {/* Statistics */}
      <SystemStats stats={stats} />

      {/* Analytics */}
      <AnalyticsOverview charts={charts} />

      {/* Audit Logs */}
      <Card>
        <Card.Header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />

            <Card.Title>
              Security Audit Logs
            </Card.Title>
          </div>

          <Badge variant="info">
            {auditLogs.length} Records
          </Badge>
        </Card.Header>

        <Card.Content>
          <Table
            columns={auditColumns}
            data={auditLogs}
            emptyMessage="No audit logs available."
            zebra
          />
        </Card.Content>
      </Card>
    </motion.div>
  );
};