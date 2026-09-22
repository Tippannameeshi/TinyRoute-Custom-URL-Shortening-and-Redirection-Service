import React, { useState } from "react";
import { useUrls } from "../hooks/useUrls";
import { useDebounce } from "../hooks/useDebounce";
import { UrlList } from "../components/url/UrlList";
import { Pagination } from "../components/common/Pagination";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Plus,
  Search,
  Star,
  Link2,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List as ListIcon,
  Sparkles,
  TrendingUp,
  MousePointerClick,
  Heart,
} from "lucide-react";

export const UrlListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const [statusFilter, setStatusFilter] = useState("");
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const {
    urls,
    pagination,
    loading,
    setParams,
    deleteUrl,
    toggleStatus,
    toggleFavorite,
  } = useUrls({
    search: debouncedSearch,
    status: statusFilter || null,
    is_favorite: isFavoriteFilter ? true : null,
    page: 1,
    limit: 10,
  });

  const handlePageChange = (newPage) => {
    setParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const activeTab = isFavoriteFilter ? "favorite" : statusFilter || "all";

  const setFilterTab = (tab) => {
    if (tab === "favorite") {
      setIsFavoriteFilter(true);
      setStatusFilter("");

      setParams((prev) => ({
        ...prev,
        is_favorite: true,
        status: null,
        page: 1,
      }));
    } else if (tab === "all") {
      setIsFavoriteFilter(false);
      setStatusFilter("");

      setParams((prev) => ({
        ...prev,
        is_favorite: null,
        status: null,
        page: 1,
      }));
    } else {
      setIsFavoriteFilter(false);
      setStatusFilter(tab);

      setParams((prev) => ({
        ...prev,
        is_favorite: null,
        status: tab,
        page: 1,
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-violet-800 to-slate-900 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-white/10 px-4 py-1 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              Link Management Center
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight">
              URL Library
            </h1>

            <p className="mt-3 max-w-2xl text-indigo-100">
              Manage, organize, search, analyze and monitor every short URL from
              one beautiful dashboard.
            </p>
          </div>

          <div className="flex items-center">
            <Link to={ROUTES.URL_CREATE}>
              <Button
                icon={Plus}
                className="bg-white text-indigo-700 hover:bg-slate-100 shadow-xl"
              >
                Create Short URL
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Total Links</span>
            <Link2 className="w-5 h-5 text-indigo-600" />
          </div>

          <h2 className="mt-3 text-3xl font-black">
            {pagination?.totalItems || urls.length}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Active</span>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>

          <h2 className="mt-3 text-3xl font-black">
            {urls.filter((u) => u.is_active).length}
          </h2>
        </div>{" "}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Favorites</span>
            <Heart className="w-5 h-5 text-rose-500" />
          </div>

          <h2 className="mt-3 text-3xl font-black">
            {urls.filter((u) => u.is_favorite).length}
          </h2>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">This Page</span>

            <TrendingUp className="w-5 h-5 text-amber-500" />
          </div>

          <h2 className="mt-3 text-3xl font-black">{urls.length}</h2>
        </div>
      </div>

      {/* ================= CONTROL BAR ================= */}

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 shadow-lg">
        <div className="flex flex-col xl:flex-row gap-5 justify-between">
          {/* FILTERS */}

          <div className="flex flex-wrap gap-2">
            {[
              {
                id: "all",
                label: "All Links",
                icon: Link2,
              },
              {
                id: "active",
                label: "Active",
                icon: CheckCircle2,
              },
              {
                id: "expired",
                label: "Expired",
                icon: Clock,
              },
              {
                id: "favorite",
                label: "Favorites",
                icon: Star,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300

                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SEARCH + VIEW */}

          <div className="flex gap-3 items-center w-full xl:w-auto">
            <div className="flex-1 xl:w-80">
              <Input
                icon={Search}
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  setParams((prev) => ({
                    ...prev,
                    search: e.target.value,
                    page: 1,
                  }));
                }}
              />
            </div>

            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-900 shadow text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-900 shadow text-indigo-600"
                    : "text-slate-500 hover:text-indigo-600"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= INFO BAR ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-slate-900 dark:to-slate-800 border border-indigo-100 dark:border-slate-700 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
            <MousePointerClick className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">
              Link Dashboard
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing
              <span className="font-semibold text-indigo-600 mx-1">
                {urls.length}
              </span>
              links on this page.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 px-4 py-2 font-semibold">
            Active : {urls.filter((u) => u.is_active).length}
          </span>

          <span className="rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 px-4 py-2 font-semibold">
            Expired : {urls.filter((u) => !u.is_active).length}
          </span>
        </div>
      </div>

      {/* ================= URL LIST ================= */}

      <UrlList
        urls={urls}
        loading={loading}
        viewMode={viewMode}
        onDelete={deleteUrl}
        onToggleStatus={toggleStatus}
        onToggleFavorite={toggleFavorite}
      />
      {/* ================= PAGINATION ================= */}

      {pagination && pagination.totalPages > 1 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Showing page
              <span className="font-bold text-indigo-600 mx-1">
                {pagination.page}
              </span>
              of
              <span className="font-bold text-indigo-600 mx-1">
                {pagination.totalPages}
              </span>
              {pagination.totalItems && (
                <>
                  •
                  <span className="ml-2">
                    Total Links :
                    <span className="font-bold text-slate-800 dark:text-white ml-1">
                      {pagination.totalItems}
                    </span>
                  </span>
                </>
              )}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}

      {!loading && urls.length === 0 && (
        <div className="rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-20 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <Link2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            No URLs Found
          </h2>

          <p className="mt-3 max-w-md mx-auto text-slate-500 dark:text-slate-400">
            There are no URLs matching your current filters. Try changing your
            search or create your first short URL.
          </p>

          <Link to={ROUTES.URL_CREATE} className="inline-block mt-8">
            <Button icon={Plus} size="lg">
              Create Your First URL
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
