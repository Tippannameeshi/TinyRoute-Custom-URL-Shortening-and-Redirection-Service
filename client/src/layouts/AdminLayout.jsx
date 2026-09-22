import React from "react";
import { Outlet } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";
import { Footer } from "../components/common/Footer";

export const AdminLayout = () => {
  return (
    <div className="app-ambient relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="relative mx-auto flex min-h-[calc(100vh-4.25rem)] w-full max-w-[1440px]">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <Sidebar isAdminMode />
        </aside>

        {/* Content */}
        <main className="relative flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 md:px-8 md:py-10">
          {/* Admin Banner */}
          <div className="mb-8 flex flex-col gap-3 rounded-xl border border-[color-mix(in_srgb,var(--color-warning)_35%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-warning)_8%,var(--color-surface))] p-4 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-warning)_18%,transparent)] text-[var(--color-warning)]">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-[var(--color-text)]">
                  Administrator Mode
                </h2>

                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  You have full access to users, URLs, analytics, and system
                  configuration.
                </p>
              </div>
            </div>

            <span className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--color-warning)_35%,var(--color-border))] px-3 py-1 text-xs font-semibold text-[var(--color-warning)]">
              Global System Control
            </span>
          </div>

          {/* Routed Pages */}
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
