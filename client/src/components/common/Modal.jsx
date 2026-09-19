import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-xl",
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
            }}
            transition={{
              duration: 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative w-full ${maxWidth} overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-10`}
          >
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-6 py-4.5 bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200/80 p-2 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 dark:border-slate-800 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="relative max-h-[78vh] overflow-y-auto px-6 py-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};