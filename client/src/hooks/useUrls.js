import { useState, useEffect, useCallback } from 'react';
import { urlApi } from '../api/urlApi';

export const useUrls = (initialParams = {}) => {
  const [urls, setUrls] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchUrls = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await urlApi.getUrls(params);
      setUrls(data.data.urls);
      setPagination(data.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch URLs');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const deleteUrl = async (id) => {
    await urlApi.deleteUrl(id);
    fetchUrls();
  };

  const toggleStatus = async (id) => {
    await urlApi.toggleStatus(id);
    fetchUrls();
  };

  const toggleFavorite = async (id) => {
    await urlApi.toggleFavorite(id);
    fetchUrls();
  };

  return {
    urls,
    pagination,
    loading,
    error,
    params,
    setParams,
    refetch: fetchUrls,
    deleteUrl,
    toggleStatus,
    toggleFavorite
  };
};
