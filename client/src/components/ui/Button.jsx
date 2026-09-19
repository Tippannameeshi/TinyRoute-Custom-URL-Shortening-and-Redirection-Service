import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon = null,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-tight';

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow-indigo-500/25 focus-visible:ring-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus-visible:ring-indigo-400',
    secondary:
      'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 shadow-sm focus-visible:ring-slate-900 dark:focus-visible:ring-slate-400',
    outline:
      'border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 focus-visible:ring-slate-400',
    ghost:
      'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus-visible:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm focus-visible:ring-rose-500 dark:bg-rose-600 dark:hover:bg-rose-500',
    success:
      'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm focus-visible:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500',
    subtle:
      'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 dark:text-indigo-300 focus-visible:ring-indigo-400',
  };

  const sizes = {
    xs: 'px-2.5 py-1 text-xs rounded-lg gap-1.5',
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5 font-semibold',
    md: 'px-4 py-2 text-sm rounded-xl gap-2 font-semibold',
    lg: 'px-5 py-2.5 text-base rounded-2xl gap-2.5 font-bold',
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.01 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className={`animate-spin ${iconSizes[size]} shrink-0 text-current`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className={`${iconSizes[size]} shrink-0`} />
      ) : null}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === 'right' ? (
        <Icon className={`${iconSizes[size]} shrink-0`} />
      ) : null}
    </motion.button>
  );
};
