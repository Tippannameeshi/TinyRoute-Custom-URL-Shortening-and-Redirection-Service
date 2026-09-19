import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { UrlTable } from '../components/admin/UrlTable';
import { Pagination } from '../components/common/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { adminApi } from '../api/adminApi';

export const AdminUrlsPage = () => {
  const { fetchUrls } = useAdmin();
  const [data, setData] = useState({ urls: [], pagination: { page: 1, totalPages: 1 } });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const loadData = useCallback(() => {
    setLoading(true);
    fetchUrls({ page, search, limit: 10 })
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [fetchUrls, page, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (urlId) => {
    if (window.confirm('Are you sure you want to delete this short URL?')) {
      await adminApi.deleteUrl(urlId);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Global URL Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">View and remove any short URL created across the system</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search URLs by title, code, or destination..."
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
        />
      </div>

      {loading ? (
        <LoadingSpinner size="large" />
      ) : (
        <>
          <UrlTable urls={data.urls} onDelete={handleDelete} />
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
