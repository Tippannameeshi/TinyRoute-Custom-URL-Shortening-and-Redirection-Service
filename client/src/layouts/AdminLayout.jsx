import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { Footer } from '../components/common/Footer';

export const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <div className="hidden md:block">
          <Sidebar isAdminMode={true} />
        </div>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="mb-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg p-3 text-xs font-semibold text-amber-800 dark:text-amber-300 flex items-center justify-between">
            <span>🛡️ Admin Mode Active</span>
            <span>Global System Control</span>
          </div>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
