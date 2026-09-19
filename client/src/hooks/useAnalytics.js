import { useState, useEffect, useCallback } from 'react';
import { analyticsApi } from '../api/analyticsApi';

export const useAnalytics = (urlId = null, initialRange = '30d') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState(initialRange);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (urlId) {
        const res = await analyticsApi.getUrlAnalytics(urlId, range);
        setData(res.data.data);
      } else {
        const res = await analyticsApi.getOverview(range);
        setData(res.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  }, [urlId, range]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return {
    data,
    loading,
    error,
    range,
    setRange,
    refetch: fetchAnalytics
  };
};
