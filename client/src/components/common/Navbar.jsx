import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useThemeContext } from '../../context/ThemeContext';
import { ROUTES } from '../../constants/routes';
import {
  Link2,
  LayoutDashboard,
  BarChart2,
  Shield,
  User,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  Plus,
  Search,
  Bell,
  CheckCircle2,
  Zap,
  MousePointerClick
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Shared design tokens
const BRAND_GRADIENT = 'bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500';
const ACTIVE_GRADIENT =
  'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20';

// Demo notifications (swap with real data / API when ready)
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: Zap,
    title: 'System Ready',
    message: 'TinyRoute engine running with sub-ms routing.',
    time: 'Just now',
    unread: true
  },
  {
    id: 2,
    icon: MousePointerClick,
    title: 'Click milestone',
    message: 'One of your links just crossed 100 clicks.',
    time: '2h ago',
    unread: true
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: 'Link created',
    message: 'Your short URL was created successfully.',
    time: 'Yesterday',
    unread: false
  }
];

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [globalSearch, setGlobalSearch] = useState('');
  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close notification popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`${ROUTES.URL_LIST}?search=${encodeURIComponent(globalSearch)}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  const desktopLinkClass = (path) =>
    `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
      isActive(path)
        ? ACTIVE_GRADIENT
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
    }`;

  const mobileLinkClass = (path) =>
    `flex items-center space-x-2 font-medium py-2 px-3 rounded-xl transition-all duration-300 ${
      isActive(path)
        ? ACTIVE_GRADIENT
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200/70
        dark:border-slate-800/70
        bg-white/80
        dark:bg-slate-950/75
        backdrop-blur-2xl
        supports-[backdrop-filter]:bg-white/70
        shadow-sm
        transition-all
        duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2.5 group shrink-0">
            <div
              className="
                w-10
                h-10
                rounded-2xl
                bg-gradient-to-r
                from-indigo-600
                via-violet-600
                to-cyan-500
                flex
                items-center
                justify-center
                text-white
                shadow-lg
                shadow-indigo-500/30
                group-hover:scale-105
                transition-all
                duration-300
              "
            >
              <Link2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Tiny<span className="text-indigo-600 dark:text-indigo-400">Route</span>
            </span>
          </Link>

          {/* Desktop Global Search Bar */}
          {isAuthenticated && (
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleGlobalSearch} className="w-full relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Global search URLs, titles, aliases..."
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    bg-white/80
                    dark:bg-slate-900/70
                    backdrop-blur-md
                    pl-11
                    pr-4
                    py-2
                    text-sm
                    text-slate-900
                    dark:text-white
                    placeholder-slate-400
                    focus:outline-none
                    transition-all
                    duration-300
                    focus:border-indigo-500
                    focus:ring-4
                    focus:ring-indigo-500/10
                  "
                />
              </form>
            </div>
          )}

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD} className={desktopLinkClass(ROUTES.DASHBOARD)}>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard</span>
                </Link>

                <Link to={ROUTES.URL_LIST} className={desktopLinkClass(ROUTES.URL_LIST)}>
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>URLs</span>
                </Link>

                {isAdmin && (
                  <Link
                    to={ROUTES.ADMIN_DASHBOARD}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-extrabold transition-all duration-300 ${
                      isActive(ROUTES.ADMIN_DASHBOARD)
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin</span>
                  </Link>
                )}

                {/* Create Button */}
                <Link
                  to={ROUTES.URL_CREATE}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-cyan-500
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-indigo-500/30
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-indigo-500/40
                  "
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create</span>
                </Link>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="
                      relative
                      p-2
                      rounded-xl
                      text-slate-500
                      hover:text-slate-700
                      dark:text-slate-400
                      dark:hover:text-slate-200
                      hover:bg-slate-100
                      dark:hover:bg-slate-800
                      transition-transform
                      duration-300
                      hover:scale-110
                    "
                    title="Notifications"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="
                          absolute
                          right-0
                          mt-2
                          w-80
                          rounded-3xl
                          backdrop-blur-xl
                          bg-white/95
                          dark:bg-slate-900/95
                          shadow-2xl
                          border
                          border-slate-200
                          dark:border-slate-700
                          overflow-hidden
                          z-50
                          text-xs
                        "
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                              Notifications
                            </h4>
                            {unreadCount > 0 && (
                              <span className="px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                                {unreadCount} new
                              </span>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllRead}
                              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>

                        {/* Scrollable list */}
                        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                          {notifications.length === 0 ? (
                            <p className="text-center text-slate-500 py-8">
                              You're all caught up.
                            </p>
                          ) : (
                            notifications.map((n) => {
                              const Icon = n.icon;
                              return (
                                <div
                                  key={n.id}
                                  className={`flex items-start gap-3 p-2.5 rounded-2xl transition-colors ${
                                    n.unread
                                      ? 'bg-indigo-50/70 dark:bg-indigo-950/30'
                                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                  }`}
                                >
                                  <div
                                    className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-white shadow-md ${BRAND_GRADIENT}`}
                                  >
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                        {n.title}
                                      </p>
                                      {n.unread && (
                                        <span className="w-2 h-2 shrink-0 rounded-full bg-indigo-500" />
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                      {n.message}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                                      {n.time}
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : null}

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 pl-1">
                <Link
                  to={ROUTES.PROFILE}
                  className="flex items-center space-x-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-2.5 py-1.5 rounded-xl transition-all duration-300"
                >
                  {/* Gradient Avatar */}
                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-gradient-to-r
                      from-indigo-600
                      via-violet-600
                      to-cyan-500
                      ring-2
                      ring-white
                      dark:ring-slate-900
                      shadow-lg
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                      text-sm
                    "
                  >
                    {user?.first_name ? user.first_name[0].toUpperCase() : 'U'}
                  </div>
                  <span>{user?.first_name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-300"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 pl-1">
                <Link
                  to={ROUTES.LOGIN}
                  className="text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs px-3 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-cyan-500
                    text-white
                    font-semibold
                    text-xs
                    px-4
                    py-2
                    shadow-lg
                    shadow-indigo-500/30
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-indigo-500/40
                  "
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-all duration-300"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="
              md:hidden
              overflow-hidden
              rounded-b-3xl
              bg-white/90
              dark:bg-slate-900/90
              backdrop-blur-xl
              border-t
              border-slate-200
              dark:border-slate-800
              shadow-xl
              px-4
              pt-3
              pb-5
              space-y-2
            "
          >
            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.DASHBOARD}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass(ROUTES.DASHBOARD)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to={ROUTES.URL_LIST}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass(ROUTES.URL_LIST)}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>URLs</span>
                </Link>
                {isAdmin && (
                  <Link
                    to={ROUTES.ADMIN_DASHBOARD}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center space-x-2 text-amber-600 font-semibold py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <Link
                  to={ROUTES.PROFILE}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass(ROUTES.PROFILE)}
                >
                  <User className="w-4 h-4" />
                  <span>Profile & Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-2 text-red-600 font-medium py-2 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to={ROUTES.LOGIN}
                  onClick={() => setMenuOpen(false)}
                  className="block text-center text-slate-700 dark:text-slate-200 font-medium py-2 border rounded-2xl border-slate-300 dark:border-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={() => setMenuOpen(false)}
                  className="block text-center bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white font-semibold py-2 rounded-2xl shadow-lg shadow-indigo-500/30"
                >
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};