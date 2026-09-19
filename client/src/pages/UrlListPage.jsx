import React, { useState } from 'react';
import { useUrls } from '../hooks/useUrls';
import { useDebounce } from '../hooks/useDebounce';
import { UrlList } from '../components/url/UrlList';
import { Pagination } from '../components/common/Pagination';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  Plus,
  Search,
  Filter,
  Star,
  Link2,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List as ListIcon,
} from 'lucide-react';

export const UrlListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [statusFilter, setStatusFilter] = useState('');
  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const {
    urls,
    pagination,
    loading,
    params,
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
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const activeTab = isFavoriteFilter
    ? 'favorite'
    : statusFilter || 'all';

  const setFilterTab = (tab) => {
    if (tab === 'favorite') {
      setIsFavoriteFilter(true);
      setStatusFilter('');
      setParams((prev) => ({ ...prev, is_favorite: true, status: null, page: 1 }));
    } else if (tab === 'all') {
      setIsFavoriteFilter(false);
      setStatusFilter('');
      setParams((prev) => ({ ...prev, is_favorite: null, status: null, page: 1 }));
    } else {
      setIsFavoriteFilter(false);
      setStatusFilter(tab);
      setParams((prev) => ({ ...prev, is_favorite: null, status: tab, page: 1 }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Short Link Library
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search, filter, analyze, and manage all your shortened links.
          </p>
        </div>

        <Link to={ROUTES.URL_CREATE}>
          <Button icon={Plus} variant="primary">
            New Short URL
          </Button>
        </Link>
      </div>

      {/* Control Bar: Tabs & Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl">
            {[
              { id: 'all', label: 'All Links', icon: Link2 },
              { id: 'active', label: 'Active', icon: CheckCircle2 },
              { id: 'expired', label: 'Expired', icon: Clock },
              { id: 'favorite', label: 'Favorites', icon: Star },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center gap-2 flex-1 lg:max-w-md">
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder="Search by title, code, or alias..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setParams((prev) => ({ ...prev, search: e.target.value, page: 1 }));
                }}
              />
            </div>

            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                title="List View"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                title="Grid View"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* URL Content Grid / List */}
      <UrlList
        urls={urls}
        loading={loading}
        viewMode={viewMode}
        onDelete={deleteUrl}
        onToggleStatus={toggleStatus}
        onToggleFavorite={toggleFavorite}
      />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
