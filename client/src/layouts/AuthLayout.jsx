import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Link2, ShieldCheck, Zap, BarChart3, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-950 text-white font-sans overflow-hidden">
      {/* Left Branding Column (SaaS Split Screen) */}
      <div className="hidden lg:flex flex-col justify-between p-12 auth-bg-gradient relative border-r border-slate-800/80">
        <div className="space-y-6 relative z-10">
          <Link to={ROUTES.HOME} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/30 transition-all">
              <Link2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Tiny<span className="text-indigo-400">Route</span>
            </span>
          </Link>

          <div className="pt-12 space-y-4 max-w-md">
            <h1 className="text-4xl font-black tracking-tight leading-tight text-white">
              Enterprise Short URLs with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                Real-Time Analytics
              </span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Shorten links, create custom aliases, set password protection, and track geographic & device analytics in a modern SaaS workspace.
            </p>
          </div>

          {/* Value props list */}
          <div className="pt-6 space-y-3.5">
            <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span>Base62 Encoding with automatic collision resolution</span>
            </div>

            <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <span>Browser, OS, Device & Country Analytics charts</span>
            </div>

            <div className="flex items-center space-x-3 text-xs font-semibold text-slate-300">
              <div className="w-6 h-6 rounded-lg bg-indigo-950 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Password protection, Expiration dates & QR code export</span>
            </div>
          </div>
        </div>

        {/* Bottom Testimonial Banner */}
        <div className="relative z-10 pt-12 border-t border-slate-800/80 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-500 flex items-center justify-center font-bold text-sm">
            TR
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">"TinyRoute powers all our product links with sub-millisecond redirection."</p>
            <p className="text-[11px] text-slate-500">DevOps & Growth Team</p>
          </div>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
