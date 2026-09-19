import React, { useState, useEffect } from 'react';
import { userApi } from '../api/userApi';
import { useThemeContext } from '../context/ThemeContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Alert } from '../components/common/Alert';

export const SettingsPage = () => {
  const { theme, setTheme } = useThemeContext();
  const [settings, setSettings] = useState({
    default_domain: 'tiny.route',
    notify_on_click: false,
    notify_on_expiration: true,
    theme: theme
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    userApi
      .getSettings()
      .then((res) => setSettings(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({ ...settings, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setSaving(true);
    try {
      await userApi.updateSettings(settings);
      setTheme(settings.theme);
      setMsg('Settings updated successfully.');
    } catch (error) {
      setErr('Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner size="large" />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Application Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Configure default shortener preferences and themes</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
        <Alert message={err} onClose={() => setErr(null)} />
        {msg && <Alert type="success" message={msg} onClose={() => setMsg(null)} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Preferred Theme
            </label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="light">Light Mode ☀️</option>
              <option value="dark">Dark Mode 🌙</option>
              <option value="system">System Default 💻</option>
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notify_on_click"
                name="notify_on_click"
                checked={settings.notify_on_click}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <label htmlFor="notify_on_click" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                Receive click notifications
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notify_on_expiration"
                name="notify_on_expiration"
                checked={settings.notify_on_expiration}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <label htmlFor="notify_on_expiration" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                Receive URL expiration warnings
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition text-sm disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
