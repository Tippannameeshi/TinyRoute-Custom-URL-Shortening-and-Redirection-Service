import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Link2 } from "lucide-react";
import { ROUTES } from "../../constants/routes";

export const Footer = () => (
  <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
    <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <Link
        to={ROUTES.HOME}
        className="flex items-center gap-2 text-sm font-bold text-[var(--color-text)]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand)] text-[var(--color-bg)]">
          <Link2 size={14} />
        </span>
        TinyRoute
      </Link>
      <p className="text-xs text-[var(--color-text-subtle)]">
        Short links, clear direction. © {new Date().getFullYear()} TinyRoute.
      </p>
      <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-text-muted)]">
        <Link
          to={ROUTES.SETTINGS}
          className="transition hover:text-[var(--color-brand)]"
        >
          Settings
        </Link>
        <a
          href="https://github.com/yourusername/TinyRoute"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition hover:text-[var(--color-brand)]"
        >
          Repository <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  </footer>
);
