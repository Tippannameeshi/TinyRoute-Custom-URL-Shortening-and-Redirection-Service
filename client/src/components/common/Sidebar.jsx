import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import {
  LayoutDashboard,
  Link as LinkIcon,
  PlusCircle,
  Settings,
  ShieldCheck,
  Users,
  Globe,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = ({ isAdminMode = false }) => {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed);
  }, [collapsed]);

  const userLinks = [
    {
      name: 'Dashboard',
      path: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'URL Management',
      path: ROUTES.URL_LIST,
      icon: LinkIcon,
    },
    {
      name: 'Create Short URL',
      path: ROUTES.URL_CREATE,
      icon: PlusCircle,
    },
    {
      name: 'Settings & Profile',
      path: ROUTES.SETTINGS,
      icon: Settings,
    },
  ];

  const adminLinks = [
    {
      name: 'Admin Dashboard',
      path: ROUTES.ADMIN_DASHBOARD,
      icon: ShieldCheck,
    },
    {
      name: 'User Management',
      path: ROUTES.ADMIN_USERS,
      icon: Users,
    },
    {
      name: 'Global URLs',
      path: ROUTES.ADMIN_URLS,
      icon: Globe,
    },
  ];

  const links = isAdminMode ? adminLinks : userLinks;

  return (
    <motion.aside
      animate={{
        width: collapsed ? 76 : 256,
      }}
      transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80 min-h-[calc(100vh-4rem)] flex flex-col relative shrink-0 shadow-xs z-20"
    >
      {/* Collapse Toggle */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
        aria-expanded={!collapsed}
        className="absolute -right-3.5 top-6 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 hover:scale-110 transition-all z-30 flex items-center justify-center text-slate-500 dark:text-slate-400"
      >
        {collapsed ? (
          <ChevronRight size={15} />
        ) : (
          <ChevronLeft size={15} />
        )}
      </button>

      {/* Header Badge */}
      <div className="px-4 pt-6 pb-3">
        {!collapsed ? (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
              {isAdminMode ? 'Enterprise System' : 'Workspace'}
            </p>
            {isAdminMode && (
              <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40">
                ADMIN CONSOLE
              </span>
            )}
          </div>
        ) : (
          <div className="h-4" />
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1.5">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              title={collapsed ? item.name : ''}
              className={({ isActive }) =>
                `group relative flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white font-medium'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : ''}`} />
                  {!collapsed && (
                    <span className="ml-3 text-sm truncate">
                      {item.name}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Meta */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 p-3 space-y-1">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center rounded-xl px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all text-xs"
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          {!collapsed && <span className="ml-3 font-medium">Docs & API</span>}
        </a>

        {!collapsed && (
          <div className="pt-2 text-center text-[10px] text-slate-400 dark:text-slate-600 font-medium">
            TinyRoute SaaS v1.0.0
          </div>
        )}
      </div>
    </motion.aside>
  );
};