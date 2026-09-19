import React from "react";
import {
  Link2,
  Heart,
  GitFork,
  Code2,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">

      {/* Background Decoration */}

      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-transparent to-cyan-50 dark:from-indigo-950/10 dark:to-cyan-950/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">

        {/* Top */}

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Brand */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">

                <Link2 size={20} />

              </div>

              <div>

                <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  TinyRoute
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Production Grade URL Shortener
                </p>

              </div>

            </div>

          </div>

          {/* Tech Stack */}

          <div className="flex flex-wrap items-center justify-center gap-2">

            {[
              "React",
              "Node.js",
              "Express",
              "MySQL",
              "Tailwind CSS",
              "JWT",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/30"
              >
                {tech}
              </span>
            ))}

          </div>

        </div>

        {/* Divider */}

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">

          <div className="text-center md:text-left">

            <p className="font-semibold text-slate-700 dark:text-slate-300">
              © {new Date().getFullYear()} TinyRoute.
              All Rights Reserved.
            </p>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              Built with{" "}
              <Heart
                size={14}
                className="mx-1 inline text-rose-500"
              />
              using React, Express, MySQL &
              Clean Architecture.
            </p>

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">

              <Code2 size={17} />

              <span className="text-sm font-medium">
                Full Stack Project
              </span>

            </div>

            <button
              className="rounded-xl border border-slate-200 p-2 text-slate-500 transition-all hover:-translate-y-1 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-500 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
            >
              <GitFork size={18} />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};