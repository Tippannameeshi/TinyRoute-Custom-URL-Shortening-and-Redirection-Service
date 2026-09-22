import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = "left",
  className = "",
  type = "button",
  onClick,
  fullWidth = false,
  rounded = "xl",
  ...props
}) => {
  const base =
    "relative inline-flex items-center justify-center overflow-hidden font-semibold tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-[var(--color-brand)] text-[var(--color-bg)] shadow-[0_8px_20px_rgb(109_124_255_/_0.2)] hover:-translate-y-0.5 hover:bg-[var(--color-brand-strong)] focus-visible:ring-[var(--color-brand)]",

    secondary:
      "bg-[var(--color-text)] text-[var(--color-bg)] shadow-[var(--shadow-sm)] hover:opacity-90",

    outline:
      "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-raised)] shadow-[var(--shadow-sm)]",

    ghost:
      "bg-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-raised)] hover:text-[var(--color-text)]",

    danger:
      "bg-[var(--color-danger)] text-white shadow-[var(--shadow-sm)] hover:brightness-110",

    success:
      "bg-[var(--color-success)] text-[var(--color-bg)] shadow-[var(--shadow-sm)] hover:brightness-105",

    subtle:
      "bg-[var(--color-brand-soft)] text-[var(--color-brand)] hover:brightness-95",

    glass:
      "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-raised)] shadow-[var(--shadow-sm)]",
  };

  const sizes = {
    xs: "px-3 py-1.5 text-xs gap-1 rounded-lg",
    sm: "px-4 py-2 text-sm gap-2 rounded-xl",
    md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
    lg: "px-6 py-3 text-base gap-2.5 rounded-2xl",
    xl: "px-8 py-4 text-lg gap-3 rounded-2xl",
  };

  const radius = {
    md: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    full: "rounded-full",
  };

  const iconSizes = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
  };

  return (
    <motion.button
      whileHover={
        disabled || isLoading
          ? {}
          : {
              y: -2,
              scale: 1.02,
            }
      }
      whileTap={
        disabled || isLoading
          ? {}
          : {
              scale: 0.97,
            }
      }
      transition={{
        duration: 0.18,
      }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`
        ${base}
        ${variants[variant] || variants.primary}
        ${sizes[size]}
        ${radius[rounded]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Glow */}

      {variant === "primary" && (
        <span
          className="
            absolute
            inset-0
            opacity-0
            hover:opacity-100
            transition-opacity
            duration-300
            bg-gradient-to-r
            from-white/10
            via-white/20
            to-white/10
          "
        />
      )}

      {/* Loading */}

      {isLoading ? (
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            opacity=".2"
          />

          <path
            d="M22 12a10 10 0 00-10-10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon size={iconSizes[size]} className="relative z-10 shrink-0" />
          )}

          <span className="relative z-10">{children}</span>

          {Icon && iconPosition === "right" && (
            <Icon size={iconSizes[size]} className="relative z-10 shrink-0" />
          )}
        </>
      )}
    </motion.button>
  );
};
