import React from "react";
import { Link2 } from "lucide-react";

export const LoadingSpinner = ({
  size = "medium",
  fullPage = false,
}) => {
  const sizeClasses = {
    small: {
      logo: "h-10 w-10",
      icon: 18,
      outer: "h-8 w-8 border-2",
      inner: "h-4 w-4",
      text: "text-xs",
    },
    medium: {
      logo: "h-14 w-14",
      icon: 24,
      outer: "h-14 w-14 border-[3px]",
      inner: "h-7 w-7",
      text: "text-sm",
    },
    large: {
      logo: "h-20 w-20",
      icon: 34,
      outer: "h-20 w-20 border-4",
      inner: "h-10 w-10",
      text: "text-base",
    },
  };

  const current = sizeClasses[size] || sizeClasses.medium;

  const spinner = (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-5"
    >
      {/* Logo */}

      <div
        aria-hidden="true"
        className={`flex ${current.logo} items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/30`}
      >
        <Link2 size={current.icon} />
      </div>

      {/* Spinner */}

      <div
        aria-hidden="true"
        className="relative flex items-center justify-center"
      >
        <div
          className={`${current.outer} animate-spin rounded-full border-indigo-600 border-t-transparent shadow-lg`}
        />

        <div
          className={`${current.inner} absolute animate-pulse rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500`}
        />
      </div>

      {/* Text */}

      <div className="space-y-1 text-center">
        <h3
          className={`font-semibold text-slate-800 dark:text-white ${current.text}`}
        >
          Loading...
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Please wait while we prepare everything.
        </p>
      </div>

      <span className="sr-only">
        Loading, please wait.
      </span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-xl pointer-events-auto dark:bg-slate-950/80">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#6366f120,transparent_40%),radial-gradient(circle_at_bottom_left,#06b6d420,transparent_40%)]"
        />

        {spinner}
      </div>
    );
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      {spinner}
    </div>
  );
};