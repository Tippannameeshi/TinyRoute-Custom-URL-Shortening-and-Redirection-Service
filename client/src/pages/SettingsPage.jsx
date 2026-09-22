import React, { useState, useEffect } from "react";
import { userApi } from "../api/userApi";
import { useThemeContext } from "../context/ThemeContext";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Alert } from "../components/common/Alert";
import {
  Settings,
  Palette,
  Bell,
  Moon,
  Sun,
  Monitor,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const SettingsPage = () => {
  const { theme, setTheme } = useThemeContext();

  const [settings, setSettings] = useState({
    default_domain: "tiny.route",
    notify_on_click: false,
    notify_on_expiration: true,
    theme: theme,
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
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setSettings({
      ...settings,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMsg(null);
    setErr(null);

    try {
      await userApi.updateSettings(settings);

      setTheme(settings.theme);

      setMsg("Settings updated successfully.");
    } catch {
      setErr("Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-700 to-sky-600 p-8 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Settings size={30} />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <Sparkles size={14} />
              Workspace Settings
            </div>

            <h1 className="mt-3 text-4xl font-black">Application Settings</h1>

            <p className="mt-2 text-indigo-100">
              Customize your workspace, notifications and appearance.
            </p>
          </div>
        </div>
      </div>

      <Alert message={err} onClose={() => setErr(null)} />

      {msg && (
        <Alert type="success" message={msg} onClose={() => setMsg(null)} />
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Theme */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-3 dark:bg-indigo-900">
              <Palette className="text-indigo-600 dark:text-indigo-300" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Appearance
              </h2>

              <p className="text-sm text-slate-500">
                Select your preferred theme.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={settings.theme === "light"}
                onChange={handleChange}
                className="hidden"
              />

              <div
                className={`rounded-2xl border-2 p-5 transition ${
                  settings.theme === "light"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <Sun className="mb-3 text-amber-500" />

                <h3 className="font-bold">Light Mode</h3>

                <p className="text-sm text-slate-500">Bright interface</p>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={settings.theme === "dark"}
                onChange={handleChange}
                className="hidden"
              />

              <div
                className={`rounded-2xl border-2 p-5 transition ${
                  settings.theme === "dark"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <Moon className="mb-3 text-indigo-500" />

                <h3 className="font-bold">Dark Mode</h3>

                <p className="text-sm text-slate-500">Comfortable at night</p>
              </div>
            </label>

            <label className="cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="system"
                checked={settings.theme === "system"}
                onChange={handleChange}
                className="hidden"
              />

              <div
                className={`rounded-2xl border-2 p-5 transition ${
                  settings.theme === "system"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <Monitor className="mb-3 text-sky-500" />

                <h3 className="font-bold">System Default</h3>

                <p className="text-sm text-slate-500">Follow your OS</p>
              </div>
            </label>
          </div>
        </div>

        {/* Notifications */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900">
              <Bell className="text-green-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Notifications
              </h2>

              <p className="text-sm text-slate-500">Control email alerts.</p>
            </div>
          </div>

          <div className="space-y-5">
            <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
              <div>
                <h4 className="font-semibold">Click Notifications</h4>

                <p className="text-sm text-slate-500">
                  Receive milestone click emails.
                </p>
              </div>

              <input
                type="checkbox"
                name="notify_on_click"
                checked={settings.notify_on_click}
                onChange={handleChange}
                className="h-5 w-5 accent-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 dark:border-slate-700">
              <div>
                <h4 className="font-semibold">Expiration Alerts</h4>

                <p className="text-sm text-slate-500">
                  Notify before links expire.
                </p>
              </div>

              <input
                type="checkbox"
                name="notify_on_expiration"
                checked={settings.notify_on_expiration}
                onChange={handleChange}
                className="h-5 w-5 accent-indigo-600"
              />
            </label>
          </div>
        </div>

        {/* Security */}

        <div className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-sky-50 p-6 dark:border-indigo-800 dark:from-slate-900 dark:to-slate-900">
          <div className="flex items-center gap-4">
            <ShieldCheck className="text-indigo-600" size={32} />

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Security
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your preferences are securely encrypted and synchronized with
                your account.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-600 px-8 py-3 font-semibold text-white shadow-xl transition hover:scale-105 disabled:opacity-60"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
