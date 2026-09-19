import { useState, useCallback } from 'react';
import { adminApi } from '../api/adminApi';

export const useAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async (params) => {
    setLoading(true);
    try {
      const { data } = await adminApi.getUsers(params);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUrls = useCallback(async (params) => {
    setLoading(true);
    try {
      const { data } = await adminApi.getAllUrls(params);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch URLs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditLogs = useCallback(async (params) => {
    setLoading(true);
    try {
      const { data } = await adminApi.getAuditLogs(params);
      return data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch audit logs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getGlobalStats();
      return data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch global stats');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchUsers,
    fetchUrls,
    fetchAuditLogs,
    fetchStats
  };
};
