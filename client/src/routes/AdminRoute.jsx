import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

export const AdminRoute = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Beautiful Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 px-6">

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10 w-full max-w-md text-center">

          <div className="mx-auto w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">

            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />

          </div>

          <h2 className="mt-6 text-2xl font-black text-slate-900 dark:text-white">
            Verifying Access
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Please wait while we verify your administrator permissions...
          </p>

          <div className="mt-8 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">

            <div className="h-full w-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full animate-pulse"></div>

          </div>

        </div>

      </div>
    );
  }

  // Not Logged In
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  // Logged In But Not Admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-red-950 px-6">

        <div className="max-w-lg w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-10 text-center">

          <div className="mx-auto w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">

            <ShieldAlert className="w-12 h-12 text-red-600" />

          </div>

          <h1 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">
            Access Denied
          </h1>

          <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">
            You don't have permission to access the administrator dashboard.
            Please contact your system administrator if you believe this is an error.
          </p>

          <button
            onClick={() => window.location.href = ROUTES.DASHBOARD}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/30"
          >
            <ShieldCheck className="w-5 h-5" />
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

  // Authorized Admin
  return <Outlet />;
};