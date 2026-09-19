import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = false,
  variant = 'default',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs',
    glass: 'glass-panel shadow-sm',
    interactive:
      'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:shadow-md transition-all cursor-pointer',
    gradient:
      'bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white border border-indigo-500/20 shadow-xl',
  };

  return (
    <motion.div
      whileHover={hover || variant === 'interactive' ? { y: -3, transition: { duration: 0.2 } } : {}}
      className={`rounded-2xl p-6 transition-all duration-200 ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={`mb-4 space-y-1 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-lg font-bold tracking-tight text-slate-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

Card.Description = ({ children, className = '' }) => (
  <p className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}>{children}</p>
);

Card.Content = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between ${className}`}>
    {children}
  </div>
);
