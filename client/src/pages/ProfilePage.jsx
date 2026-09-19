import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { useThemeContext } from '../context/ThemeContext';
import { Alert } from '../components/common/Alert';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { User, Lock, Sliders, ShieldCheck, Mail } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useThemeContext();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile State
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || ''
  });
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileErr, setProfileErr] = useState(null);

  // Password State
  const [passwordData, setPasswordData] = useState({ current_password: '', new_password: '' });
  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    default_domain: 'tiny.route',
    notify_on_click: false,
    notify_on_expiration: true,
    theme: theme
  });
  const [settingsMsg, setSettingsMsg] = useState(null);
  const [settingsErr, setSettingsErr] = useState(null);
  const [settingsSaving, setSettingsSaving] = useState(false);

  useEffect(() => {
    userApi
      .getSettings()
      .then((res) => setSettings(res.data.data))
      .catch(() => {});
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileErr(null);
    try {
      await updateProfile(profileData.first_name, profileData.last_name);
      setProfileMsg('Profile updated successfully.');
    } catch (err) {
      setProfileErr(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordErr(null);
    setPasswordLoading(true);
    try {
      await authApi.changePassword(passwordData);
      setPasswordMsg('Password changed successfully.');
      setPasswordData({ current_password: '', new_password: '' });
    } catch (err) {
      setPasswordErr(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSettingsMsg(null);
    setSettingsErr(null);
    setSettingsSaving(true);
    try {
      await userApi.updateSettings(settings);
      setTheme(settings.theme);
      setSettingsMsg('Preferences updated successfully.');
    } catch (err) {
      setSettingsErr('Failed to update settings.');
    } finally {
      setSettingsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'password', label: 'Password & Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Sliders }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Account & Preferences</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Manage your profile, password security, and theme settings</p>
      </div>

      {/* Modern Tab Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile Info */}
      {activeTab === 'profile' && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Personal Information</h3>
          <Alert message={profileErr} onClose={() => setProfileErr(null)} />
          {profileMsg && <Alert type="success" message={profileMsg} onClose={() => setProfileMsg(null)} />}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={profileData.first_name}
                onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
              />
              <Input
                label="Last Name"
                required
                value={profileData.last_name}
                onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              disabled
              icon={Mail}
              value={user?.email || ''}
              helperText="Email address cannot be modified directly for security reasons"
            />

            <div className="flex justify-end pt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 2: Password & Security */}
      {activeTab === 'password' && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Change Password</h3>
          <Alert message={passwordErr} onClose={() => setPasswordErr(null)} />
          {passwordMsg && <Alert type="success" message={passwordMsg} onClose={() => setPasswordMsg(null)} />}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              required
              icon={Lock}
              value={passwordData.current_password}
              onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
            />

            <Input
              label="New Password"
              type="password"
              required
              icon={Lock}
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              placeholder="Minimum 8 characters"
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" isLoading={passwordLoading}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tab 3: Preferences */}
      {activeTab === 'preferences' && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Workspace Preferences</h3>
          <Alert message={settingsErr} onClose={() => setSettingsErr(null)} />
          {settingsMsg && <Alert type="success" message={settingsMsg} onClose={() => setSettingsMsg(null)} />}

          <form onSubmit={handleSettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Interface Theme
              </label>
              <select
                name="theme"
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl"
              >
                <option value="light">Light Theme ☀️</option>
                <option value="dark">Dark Theme 🌙</option>
                <option value="system">System Default 💻</option>
              </select>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notify_on_click"
                  checked={settings.notify_on_click}
                  onChange={(e) => setSettings({ ...settings, notify_on_click: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="notify_on_click" className="ml-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Receive email alerts on milestone link clicks
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notify_on_expiration"
                  checked={settings.notify_on_expiration}
                  onChange={(e) => setSettings({ ...settings, notify_on_expiration: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <label htmlFor="notify_on_expiration" className="ml-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Receive notifications before short links expire
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" isLoading={settingsSaving}>
                Save Preferences
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
