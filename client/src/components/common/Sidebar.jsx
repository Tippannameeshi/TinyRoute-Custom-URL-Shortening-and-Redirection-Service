import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Gauge,
  Link2,
  Plus,
  Settings,
  Shield,
  Users,
  Globe,
} from "lucide-react";

import { ROUTES } from "../../constants/routes";

const userLinks = [
  { name: "Overview", path: ROUTES.DASHBOARD, icon: Gauge },
  { name: "Links", path: ROUTES.URL_LIST, icon: Link2 },
  { name: "Create link", path: ROUTES.URL_CREATE, icon: Plus },
  { name: "Settings", path: ROUTES.SETTINGS, icon: Settings },
];

const adminLinks = [
  { name: "Overview", path: ROUTES.ADMIN_DASHBOARD, icon: Shield },
  { name: "Users", path: ROUTES.ADMIN_USERS, icon: Users },
  { name: "All links", path: ROUTES.ADMIN_URLS, icon: Globe },
];

export const Sidebar = ({ isAdminMode = false }) => {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("sidebar-collapsed") === "true",
  );
  useEffect(
    () => localStorage.setItem("sidebar-collapsed", String(collapsed)),
    [collapsed],
  );
  const links = isAdminMode ? adminLinks : userLinks;

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 232 }}
      transition={{ duration: 0.2 }}
      className="relative flex min-h-[calc(100vh-4.25rem)] shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-2 py-4"
    >
      <button
        onClick={() => setCollapsed((value) => !value)}
        className="absolute -right-3.5 top-5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] shadow-[var(--shadow-sm)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
      <div
        className={`mb-5 border-b border-[var(--color-border)] px-2 pb-4 ${collapsed ? "text-center" : ""}`}
      >
        <p className="eyebrow">
          {collapsed ? "TR" : isAdminMode ? "Admin console" : "Workspace"}
        </p>
        {!collapsed && (
          <p className="mt-1 text-xs text-[var(--color-text-subtle)]">
            {isAdminMode ? "System operations" : "Personal workspace"}
          </p>
        )}
      </div>
      <nav
        aria-label={isAdminMode ? "Admin navigation" : "Workspace navigation"}
        className="space-y-1"
      >
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            end
            to={path}
            title={collapsed ? name : undefined}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-semibold transition ${collapsed ? "justify-center" : ""} ${isActive ? "bg-[var(--color-brand-soft)] text-[var(--color-brand)]" : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]"}`
            }
          >
            <Icon size={17} strokeWidth={1.8} />
            <span className={collapsed ? "sr-only" : ""}>{name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-[var(--color-border)] pt-3">
        <a
          href="#"
          className={`flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-xs font-semibold text-[var(--color-text-subtle)] transition hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)] ${collapsed ? "justify-center" : ""}`}
        >
          <CircleHelp size={17} />
          <span className={collapsed ? "sr-only" : ""}>Documentation</span>
        </a>
        {!collapsed && (
          <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3">
            <p className="text-xs font-bold text-[var(--color-text)]">
              TinyRoute
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-text-subtle)]">
              Link intelligence, simply.
            </p>
            <span className="mt-3 inline-flex rounded bg-[var(--color-brand-soft)] px-2 py-1 font-mono text-[10px] font-bold text-[var(--color-brand)]">
              v1.0.0
            </span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
