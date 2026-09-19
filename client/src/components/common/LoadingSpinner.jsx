import React from "react";
import { Link2 } from "lucide-react";

export const LoadingSpinner = ({
  size = "medium",
  fullPage = false,
}) => {
  const sizeClasses = {
    small: {
      outer: "w-8 h-8 border-2",
      inner: "w-4 h-4",
      text: "text-xs",
    },
    medium: {
      outer: "w-14 h-14 border-[3px]",
      inner: "w-7 h-7",
      text: "text-sm",
    },
    large: {
      outer: "w-20 h-20 border-4",
      inner: "w-10 h-10",
      text: "text-base",
    },
  };

  const current =
    sizeClasses[size] || sizeClasses.medium;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-5">

      {/* Logo */}

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/30">

        <Link2 size={24} />

      </div>

      {/* Spinner */}

      <div className="relative flex items-center justify-center">

        <div
          className={`${current.outer}
          animate-spin
          rounded-full
          border-indigo-600
          border-t-transparent
          shadow-lg`}
        />

        <div
          className={`${current.inner}
          absolute
          animate-pulse
          rounded-full
          bg-gradient-to-r
          from-indigo-500
          via-violet-500
          to-cyan-500`}
        />

      </div>

      {/* Loading Text */}

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

      <span className="sr-only">Loading...</span>

    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-xl dark:bg-slate-950/80">

        {/* Decorative Background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#6366f120,transparent_40%),radial-gradient(circle_at_bottom_left,#06b6d420,transparent_40%)]" />

        {spinner}

      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      {spinner}
    </div>
  );
};