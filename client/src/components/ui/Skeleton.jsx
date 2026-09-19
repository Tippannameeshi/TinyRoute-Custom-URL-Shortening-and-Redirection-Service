import React from 'react';

export const Skeleton = ({ className = '', circle = false }) => {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 ${
        circle ? 'rounded-full' : 'rounded-xl'
      } ${className}`}
    />
  );
};
