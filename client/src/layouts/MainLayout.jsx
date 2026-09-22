import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export const MainLayout = () => {
  return (
    <div className="app-ambient relative flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full">
        <div className="page-container relative px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
