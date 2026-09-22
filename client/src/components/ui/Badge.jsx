import React from "react";
import { motion } from "framer-motion";

export const Badge = ({
  children,
  variant = "info",
  size = "md",
  dot = false,
  icon: Icon = null,
  className = "",
}) => {
  const variants = {
    active:
      "bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50",

    success:
      "bg-emerald-50/90 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/70 dark:border-emerald-800/50",

    expired:
      "bg-rose-50/90 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200/70 dark:border-rose-800/50",

    danger:
      "bg-rose-50/90 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200/70 dark:border-rose-800/50",

    warning:
      "bg-amber-50/90 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/50",

    favorite:
      "bg-amber-50/90 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200/70 dark:border-amber-800/50",

    info:
      "bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/70 dark:border-indigo-800/50",

    indigo:
      "bg-indigo-50/90 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200/70 dark:border-indigo-800/50",

    cyan:
      "bg-cyan-50/90 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border-cyan-200/70 dark:border-cyan-800/50",

    purple:
      "bg-purple-50/90 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/50",

    admin:
      "bg-purple-50/90 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200/70 dark:border-purple-800/50",

    slate:
      "bg-slate-100/90 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200/70 dark:border-slate-700/60",

    disabled:
      "bg-slate-100/90 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 border-slate-200/70 dark:border-slate-700/60",
  };

  const dotColors = {
    active: "bg-emerald-500",
    success: "bg-emerald-500",

    expired: "bg-rose-500",
    danger: "bg-rose-500",

    warning: "bg-amber-500",
    favorite: "bg-amber-500",

    admin: "bg-purple-500",
    purple: "bg-purple-500",

    info: "bg-indigo-500",
    indigo: "bg-indigo-500",

    cyan: "bg-cyan-500",

    slate: "bg-slate-400",
    disabled: "bg-slate-400",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-4 py-1.5 text-sm gap-2",
  };

  return (
    <motion.span
      whileHover={{
        y: -1,
        scale: 1.03,
      }}
      transition={{
        duration: 0.18,
      }}
      className={`
        inline-flex
        items-center
        rounded-full
        border
        backdrop-blur-md
        font-semibold
        tracking-wide
        shadow-sm
        transition-all
        duration-200
        select-none
        ${variants[variant] || variants.info}
        ${sizes[size]}
        ${className}
      `}
    >
      {dot && (
        <motion.span
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className={`
            w-2
            h-2
            rounded-full
            shadow
            ${dotColors[variant] || "bg-indigo-500"}
          `}
        />
      )}

      {Icon && (
        <Icon
          className={`
            ${
              size === "lg"
                ? "w-4 h-4"
                : size === "sm"
                ? "w-3 h-3"
                : "w-3.5 h-3.5"
            }
            shrink-0
          `}
        />
      )}

      <span className="truncate">{children}</span>
    </motion.span>
  );
};