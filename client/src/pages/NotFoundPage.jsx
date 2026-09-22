import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Home, ArrowLeft, SearchX } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-2xl w-full">

        <div className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-10 text-center">

          {/* Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <SearchX className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>

          {/* 404 */}
          <h1 className="mt-8 text-7xl font-black bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            404
          </h1>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            Oops! Page Not Found
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
            The page you're trying to access doesn't exist, has been removed,
            or the URL might be incorrect.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 px-6 py-3 text-white font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <Home size={18} />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

          </div>

          {/* Footer */}
          <div className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-6">

            <p className="text-sm text-slate-500 dark:text-slate-500">
              Need help? Contact our support team or return to the dashboard.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};