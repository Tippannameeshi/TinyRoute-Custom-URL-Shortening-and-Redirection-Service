import React from 'react';
import { UrlCard } from './UrlCard';
import { Skeleton } from '../ui/Skeleton';
import { Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UrlList = ({
  urls,
  loading,
  viewMode = 'list',
  onDelete,
  onToggleStatus,
  onToggleFavorite,
}) => {
  if (loading) {
    return (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
            : 'space-y-4'
        }
      >
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-3"
          >
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (!urls || urls.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
          <Link2 className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          No short URLs found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Create your first short link or adjust your search filters above!
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
          : 'space-y-4'
      }
    >
      <AnimatePresence>
        {urls.map((urlRecord) => (
          <motion.div
            key={urlRecord.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <UrlCard
              urlRecord={urlRecord}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onToggleFavorite={onToggleFavorite}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
