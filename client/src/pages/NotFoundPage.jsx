import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">404</div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Page Not Found</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        The link or page you are looking for does not exist or has been moved.
      </p>
      <Link
        to={ROUTES.HOME}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition text-sm"
      >
        Back to Home
      </Link>
    </div>
  );
};
