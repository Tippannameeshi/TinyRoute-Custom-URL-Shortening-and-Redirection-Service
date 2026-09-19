import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { urlApi } from '../api/urlApi';
import { Alert } from '../components/common/Alert';

export const RedirectPassThroughPage = () => {
  const { shortCode } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await urlApi.verifyPassword(shortCode, password);
      const targetUrl = data.data.original_url;
      window.location.href = targetUrl;
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect password. Access denied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="text-center space-y-2">
          <div className="text-4xl">🔒</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Password Protected Link</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This short link ({shortCode}) requires a password to access
          </p>
        </div>

        <Alert message={error} onClose={() => setError(null)} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Enter Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Unlock & Redirect'}
          </button>
        </form>
      </div>
    </div>
  );
};
