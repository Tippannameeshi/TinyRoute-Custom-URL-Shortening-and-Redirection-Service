import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { useThemeContext } from "../context/ThemeContext";

import { Alert } from "../components/common/Alert";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

import {
  User,
  Lock,
  Sliders,
  Mail,
  Shield,
  Bell,
  Moon,
  Sun,
  Monitor,
  Camera,
  Save,
} from "lucide-react";

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useThemeContext();

  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  });

  const [profileMsg, setProfileMsg] = useState(null);
  const [profileErr, setProfileErr] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const [passwordMsg, setPasswordMsg] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [settings, setSettings] = useState({
    default_domain: "tiny.route",
    notify_on_click: false,
    notify_on_expiration: true,
    theme: theme,
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

    setProfileErr(null);
    setProfileMsg(null);

    try {
      await updateProfile(
        profileData.first_name,
        profileData.last_name
      );

      setProfileMsg("Profile updated successfully.");
    } catch (err) {
      setProfileErr(
        err.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setPasswordLoading(true);
    setPasswordErr(null);
    setPasswordMsg(null);

    try {
      await authApi.changePassword(passwordData);

      setPasswordMsg("Password updated successfully.");

      setPasswordData({
        current_password: "",
        new_password: "",
      });
    } catch (err) {
      setPasswordErr(
        err.response?.data?.message ||
          "Unable to update password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();

    setSettingsSaving(true);
    setSettingsErr(null);
    setSettingsMsg(null);

    try {
      await userApi.updateSettings(settings);

      setTheme(settings.theme);

      setSettingsMsg("Preferences saved successfully.");
    } catch {
      setSettingsErr("Failed to save preferences.");
    } finally {
      setSettingsSaving(false);
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "password",
      label: "Security",
      icon: Shield,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: Sliders,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 p-8 text-white shadow-xl"
      >

        <div className="absolute right-0 top-0 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="flex items-center gap-5">

            <div className="relative">

              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-black border-4 border-white/30">
                {user?.first_name?.charAt(0)}
              </div>

              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg hover:scale-110 transition">
                <Camera size={16} />
              </button>

            </div>

            <div>

              <h1 className="text-3xl font-black">
                {user?.first_name} {user?.last_name}
              </h1>

              <p className="text-indigo-100 mt-1">
                {user?.email}
              </p>

              <span className="inline-flex mt-3 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                Premium Member
              </span>

            </div>

          </div>

          <Button className="bg-white text-indigo-700 hover:bg-slate-100">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>

        </div>

      </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}

        <Card className="lg:col-span-1 p-4">

          <div className="space-y-2">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 font-semibold text-sm
                  ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}

          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-600 p-5 text-white">

            <Bell className="w-8 h-8 mb-3" />

            <h3 className="font-bold">
              Pro Tips
            </h3>

            <p className="text-xs text-indigo-100 mt-2 leading-relaxed">
              Enable email notifications to stay updated whenever
              your links reach milestones or are about to expire.
            </p>

          </div>

        </Card>

        {/* Content */}

        <div className="lg:col-span-3">

          {/* ================= PROFILE ================= */}

          {activeTab === "profile" && (

            <motion.div
              initial={{opacity:0,y:15}}
              animate={{opacity:1,y:0}}
            >

              <Card className="p-8 space-y-6">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Personal Information
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Update your personal details.
                  </p>

                </div>

                <Alert
                  message={profileErr}
                  onClose={() => setProfileErr(null)}
                />

                {profileMsg && (

                  <Alert
                    type="success"
                    message={profileMsg}
                    onClose={() => setProfileMsg(null)}
                  />

                )}

                <form
                  onSubmit={handleProfileSubmit}
                  className="space-y-6"
                >

                  <div className="grid md:grid-cols-2 gap-6">

                    <Input
                      label="First Name"
                      value={profileData.first_name}
                      required
                      icon={User}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          first_name: e.target.value,
                        })
                      }
                    />

                    <Input
                      label="Last Name"
                      value={profileData.last_name}
                      required
                      icon={User}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          last_name: e.target.value,
                        })
                      }
                    />

                  </div>

                  <Input
                    label="Email Address"
                    value={user?.email || ""}
                    disabled
                    icon={Mail}
                    helperText="Email cannot be changed."
                  />

                  <div className="flex justify-end">

                    <Button type="submit">
                      Save Profile
                    </Button>

                  </div>

                </form>

              </Card>

            </motion.div>

          )}
                    {/* ================= SECURITY ================= */}

          {activeTab === "password" && (

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <Card className="p-8 space-y-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Password & Security
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Keep your account protected with a strong password.
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>

                </div>

                <Alert
                  message={passwordErr}
                  onClose={() => setPasswordErr(null)}
                />

                {passwordMsg && (
                  <Alert
                    type="success"
                    message={passwordMsg}
                    onClose={() => setPasswordMsg(null)}
                  />
                )}

                <form
                  onSubmit={handlePasswordSubmit}
                  className="space-y-6"
                >

                  <Input
                    label="Current Password"
                    type="password"
                    required
                    icon={Lock}
                    value={passwordData.current_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current_password: e.target.value,
                      })
                    }
                  />

                  <Input
                    label="New Password"
                    type="password"
                    required
                    icon={Lock}
                    placeholder="Minimum 8 characters"
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        new_password: e.target.value,
                      })
                    }
                  />

                  {/* Password Strength */}

                  <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5">

                    <div className="flex items-center justify-between mb-3">

                      <span className="font-semibold text-sm">
                        Password Strength
                      </span>

                      <span className="text-xs font-bold text-emerald-600">
                        Strong
                      </span>

                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">

                      <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400" />

                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-slate-500">

                      <li>✓ At least 8 characters</li>
                      <li>✓ One uppercase letter</li>
                      <li>✓ One lowercase letter</li>
                      <li>✓ One special character</li>
                      <li>✓ One numeric digit</li>

                    </ul>

                  </div>

                  <div className="flex justify-end">

                    <Button
                      type="submit"
                      isLoading={passwordLoading}
                    >
                      Update Password
                    </Button>

                  </div>

                </form>

              </Card>

            </motion.div>

          )}
                    {/* ================= PREFERENCES ================= */}

          {activeTab === "preferences" && (

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <Card className="p-8 space-y-8">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Workspace Preferences
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Customize your dashboard experience.
                  </p>

                </div>

                <Alert
                  message={settingsErr}
                  onClose={() => setSettingsErr(null)}
                />

                {settingsMsg && (
                  <Alert
                    type="success"
                    message={settingsMsg}
                    onClose={() => setSettingsMsg(null)}
                  />
                )}

                <form
                  onSubmit={handleSettingsSubmit}
                  className="space-y-8"
                >

                  {/* Theme */}

                  <div>

                    <label className="block text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                      Choose Theme
                    </label>

                    <div className="grid md:grid-cols-3 gap-5">

                      <button
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            theme: "light",
                          })
                        }
                        className={`rounded-2xl border p-5 transition-all ${
                          settings.theme === "light"
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                            : "border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <Sun className="w-8 h-8 mx-auto text-amber-500 mb-3" />

                        <h3 className="font-semibold">
                          Light
                        </h3>

                        <p className="text-xs text-slate-500 mt-2">
                          Bright interface for daytime work.
                        </p>

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            theme: "dark",
                          })
                        }
                        className={`rounded-2xl border p-5 transition-all ${
                          settings.theme === "dark"
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                            : "border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <Moon className="w-8 h-8 mx-auto text-indigo-500 mb-3" />

                        <h3 className="font-semibold">
                          Dark
                        </h3>

                        <p className="text-xs text-slate-500 mt-2">
                          Comfortable viewing in low light.
                        </p>

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            theme: "system",
                          })
                        }
                        className={`rounded-2xl border p-5 transition-all ${
                          settings.theme === "system"
                            ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                            : "border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        <Monitor className="w-8 h-8 mx-auto text-emerald-500 mb-3" />

                        <h3 className="font-semibold">
                          System
                        </h3>

                        <p className="text-xs text-slate-500 mt-2">
                          Follow your operating system theme.
                        </p>

                      </button>

                    </div>

                  </div>

                  {/* Notifications */}

                  <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5">

                    <h3 className="font-bold text-lg">
                      Notifications
                    </h3>

                    <label className="flex items-center justify-between">

                      <div>

                        <p className="font-medium">
                          Link Click Alerts
                        </p>

                        <p className="text-sm text-slate-500">
                          Notify when links reach milestones.
                        </p>

                      </div>

                      <input
                        type="checkbox"
                        checked={settings.notify_on_click}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notify_on_click: e.target.checked,
                          })
                        }
                        className="w-5 h-5 accent-indigo-600"
                      />

                    </label>

                    <label className="flex items-center justify-between">

                      <div>

                        <p className="font-medium">
                          Expiration Alerts
                        </p>

                        <p className="text-sm text-slate-500">
                          Notify before links expire.
                        </p>

                      </div>

                      <input
                        type="checkbox"
                        checked={settings.notify_on_expiration}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notify_on_expiration: e.target.checked,
                          })
                        }
                        className="w-5 h-5 accent-indigo-600"
                      />

                    </label>

                  </div>

                  <div className="flex justify-end">

                    <Button
                      type="submit"
                      isLoading={settingsSaving}
                    >
                      Save Preferences
                    </Button>

                  </div>

                </form>

              </Card>

            </motion.div>

          )}

        </div>

      </div>

    </div>
  );
};