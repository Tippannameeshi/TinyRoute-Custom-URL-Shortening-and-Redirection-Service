import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Sparkles } from "lucide-react";

import { UrlCard } from "./UrlCard";
import { Skeleton } from "../ui/Skeleton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.18,
    },
  },
};

export const UrlList = ({
  urls = [],
  loading = false,
  viewMode = "list",
  onDelete,
  onToggleStatus,
  onToggleFavorite,
}) => {
  const layoutClasses =
    viewMode === "grid"
      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
      : "space-y-5";

  if (loading) {
    return (
      <div className={layoutClasses}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-40" />
              <Skeleton circle className="h-10 w-10" />
            </div>

            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />

            <div className="flex justify-between pt-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!urls.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-16 text-center shadow-sm"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
          <Link2 className="h-7 w-7" />
        </div>

        <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
          No URLs Found
        </h2>

        <p className="mt-2 max-w-md mx-auto text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          You haven't created any short links yet, or your current filters
          returned no results.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-4 h-4" />
          Create your first short URL
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={layoutClasses}
    >
      <AnimatePresence mode="popLayout">
        {urls.map((urlRecord) => (
          <motion.div
            key={urlRecord.id}
            layout
            variants={itemVariants}
            exit="exit"
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
    </motion.div>
  );
};