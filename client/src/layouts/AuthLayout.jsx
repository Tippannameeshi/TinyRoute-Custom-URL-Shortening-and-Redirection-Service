import React from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Link2, ShieldCheck, Zap, BarChart3, CheckCircle2 } from "lucide-react";

import { ROUTES } from "../constants/routes";

const FEATURES = [
  {
    icon: Zap,
    title: "Base62 Encoding",
    description: "Automatic collision detection and unique short links.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track clicks, devices, browsers, operating systems and countries.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Password protection, expiration dates and QR code support.",
  },
  {
    icon: CheckCircle2,
    title: "Production Ready",
    description: "Designed for scalability, performance and reliability.",
  },
];

export const AuthLayout = () => {
  return (
    <div className="app-ambient relative min-h-screen bg-[var(--color-bg)] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
      {/* Left Side */}
      <div className="relative hidden overflow-hidden border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] lg:flex">
        {/* Background */}
        <div className="app-grid absolute inset-0 opacity-70" />

        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-[var(--color-brand)]/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--color-cyan)]/10 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col justify-between p-14">
          {/* Logo */}
          <div>
            <Link to={ROUTES.HOME} className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand)] text-[var(--color-bg)] shadow-[0_8px_24px_rgb(109_124_255_/_0.25)]">
                <Link2 className="h-6 w-6 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text)]">
                  Tiny
                  <span className="text-[var(--color-brand)]">Route</span>
                </h1>

                <p className="text-xs text-[var(--color-text-subtle)]">
                  Enterprise URL Shortener
                </p>
              </div>
            </Link>

            <div className="mt-20 max-w-lg">
              <h2 className="text-5xl font-bold leading-tight tracking-[-0.05em] text-[var(--color-text)]">
                Every link, made legible.
              </h2>

              <p className="mt-6 text-lg leading-8 text-[var(--color-text-muted)]">
                Create branded short links, monitor engagement, protect links
                with passwords, generate QR codes and gain actionable analytics
                through a clean SaaS dashboard.
              </p>
            </div>

            <div className="mt-14 space-y-6">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-brand-soft)]">
                      <Icon className="h-5 w-5 text-[var(--color-brand)]" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[var(--color-text)]">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Card */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-brand-soft)] text-sm font-bold text-[var(--color-brand)]">
                TR
              </div>

              <div>
                <p className="font-medium text-[var(--color-text)]">
                  "TinyRoute powers millions of redirects with enterprise-grade
                  reliability."
                </p>

                <p className="mt-1 text-sm text-[var(--color-text-subtle)]">
                  Engineering Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center justify-center bg-[var(--color-bg)] px-6 py-12 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};
