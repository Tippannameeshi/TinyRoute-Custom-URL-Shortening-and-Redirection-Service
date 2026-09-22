import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";
import { Footer } from "../components/common/Footer";

export const DashboardLayout = () => {
  return (
    <div className="app-ambient relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Layout */}
      <div className="relative mx-auto flex min-h-[calc(100vh-4.25rem)] w-full max-w-[1440px]">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-[4.25rem]">
            <Sidebar isAdminMode={false} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="relative flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 md:px-8 md:py-10">
          <div className="mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
