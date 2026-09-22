import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Link2,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Shield,
  Sun,
  User,
  X,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { useThemeContext } from "../../context/ThemeContext";
import { ROUTES } from "../../constants/routes";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "System ready",
    message: "TinyRoute is routing normally.",
    time: "Just now",
    unread: true,
  },
  {
    id: 2,
    title: "Click milestone",
    message: "One of your links crossed 100 clicks.",
    time: "2h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Link created",
    message: "Your short URL was created successfully.",
    time: "Yesterday",
    unread: false,
  },
];

const navClass = (active) =>
  `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${active ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"}`;

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      )
        setNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim())
      navigate(
        `${ROUTES.URL_LIST}?search=${encodeURIComponent(search.trim())}`,
      );
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const unreadCount = notifications.filter((item) => item.unread).length;
  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-nav sticky top-0 z-[var(--z-header)] border-b">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to={ROUTES.HOME}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="TinyRoute home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand)] text-[var(--color-bg)] shadow-[0_8px_24px_rgb(109_124_255_/_0.28)] transition-transform group-hover:-rotate-6">
            <Link2 size={18} strokeWidth={2.5} />
          </span>
          <span className="font-[var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-text)]">
            Tiny<span className="text-[var(--color-brand)]">Route</span>
          </span>
        </Link>

        {isAuthenticated && (
          <form
            onSubmit={handleSearch}
            className="hidden max-w-md flex-1 lg:block"
          >
            <label className="relative block">
              <span className="sr-only">Search URLs</span>
              <Search
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search links..."
                className="h-9 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] pl-10 pr-4 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-brand)] focus:shadow-[var(--focus-ring)]"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-subtle)] xl:block">
                /
              </kbd>
            </label>
          </form>
        )}

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to={ROUTES.DASHBOARD}
                className={navClass(isActive(ROUTES.DASHBOARD))}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <Link
                to={ROUTES.URL_LIST}
                className={navClass(isActive(ROUTES.URL_LIST))}
              >
                <Link2 size={15} />
                Links
              </Link>
              {isAdmin && (
                <Link
                  to={ROUTES.ADMIN_DASHBOARD}
                  className={navClass(location.pathname.startsWith("/admin"))}
                >
                  <Shield size={15} />
                  Admin
                </Link>
              )}
              <Link
                to={ROUTES.URL_CREATE}
                className="ml-2 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand)] px-3 py-2 text-xs font-bold text-[var(--color-bg)] shadow-[0_8px_20px_rgb(109_124_255_/_0.2)] transition hover:-translate-y-0.5 hover:bg-[var(--color-brand-strong)]"
              >
                <Plus size={15} />
                Create link
              </Link>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className={navClass(false)}>
                Sign in
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="ml-2 rounded-lg bg-[var(--color-brand)] px-3.5 py-2 text-xs font-bold text-[var(--color-bg)] transition hover:bg-[var(--color-brand-strong)]"
              >
                Get started
              </Link>
            </>
          )}
          <div className="mx-2 h-5 w-px bg-[var(--color-border)]" />
          {isAuthenticated && (
            <div ref={notificationRef} className="relative">
              <button
                onClick={() => setNotificationsOpen((open) => !open)}
                className="relative rounded-lg p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
              >
                <Bell size={17} />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
                )}
              </button>
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="app-surface absolute right-0 top-11 z-[var(--z-overlay)] w-80 overflow-hidden rounded-xl"
                  >
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                      <strong className="text-sm">Notifications</strong>
                      <button
                        onClick={() =>
                          setNotifications((items) =>
                            items.map((item) => ({ ...item, unread: false })),
                          )
                        }
                        className="text-[11px] font-semibold text-[var(--color-brand)]"
                      >
                        Mark read
                      </button>
                    </div>
                    <div className="space-y-1 p-2">
                      {notifications.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-lg p-3 ${item.unread ? "bg-[var(--color-brand-soft)]" : ""}`}
                        >
                          <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                            <span>{item.title}</span>
                            {item.unread && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
                            )}
                          </div>
                          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                            {item.message}
                          </p>
                          <time className="mt-1 block text-[10px] text-[var(--color-text-subtle)]">
                            {item.time}
                          </time>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          {isAuthenticated && (
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-lg p-1.5 pr-2 text-left transition hover:bg-[var(--color-surface-raised)]"
                aria-expanded={profileOpen}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand-soft)] text-xs font-bold text-[var(--color-brand)]">
                  {user?.first_name?.[0]?.toUpperCase() || "U"}
                </span>
                <span className="hidden max-w-20 truncate text-xs font-semibold xl:block">
                  {user?.first_name || "Account"}
                </span>
                <ChevronDown
                  size={14}
                  className="text-[var(--color-text-subtle)]"
                />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="app-surface absolute right-0 top-11 z-[var(--z-overlay)] w-44 rounded-xl p-1"
                  >
                    <Link
                      to={ROUTES.PROFILE}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold hover:bg-[var(--color-surface-raised)]"
                    >
                      <User size={14} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-danger)] hover:bg-[var(--color-surface-raised)]"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-[var(--color-text-muted)]"
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-2 text-[var(--color-text-muted)]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-[var(--color-border)] px-4 py-3 md:hidden"
          >
            <div className="space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to={ROUTES.DASHBOARD}
                    className={navClass(isActive(ROUTES.DASHBOARD))}
                  >
                    <LayoutDashboard size={15} />
                    Dashboard
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to={ROUTES.URL_LIST}
                    className={navClass(isActive(ROUTES.URL_LIST))}
                  >
                    <Link2 size={15} />
                    Links
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to={ROUTES.URL_CREATE}
                    className={navClass(false)}
                  >
                    <Plus size={15} />
                    Create link
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-danger)]"
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to={ROUTES.LOGIN}
                    className={navClass(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to={ROUTES.REGISTER}
                    className={navClass(false)}
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
