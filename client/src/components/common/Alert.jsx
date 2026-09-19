import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

export const Alert = ({
  type = "error",
  message,
  onClose,
}) => {
  if (!message) return null;

  const variants = {
    error: {
      container:
        "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
      icon: <AlertCircle size={20} className="text-rose-500" />,
    },

    success: {
      container:
        "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
      icon: <CheckCircle2 size={20} className="text-emerald-500" />,
    },

    warning: {
      container:
        "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
      icon: <AlertTriangle size={20} className="text-amber-500" />,
    },
  };

  const current = variants[type] || variants.error;

  return (
    <div
      className={`
        my-4
        flex
        items-start
        justify-between
        gap-4
        rounded-2xl
        border
        p-4
        shadow-sm
        animate-in
        fade-in
        slide-in-from-top-2
        duration-300
        ${current.container}
      `}
    >
      <div className="flex items-start gap-3 flex-1">
        <div className="mt-0.5 flex-shrink-0">
          {current.icon}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium leading-6">
            {message}
          </p>
        </div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};