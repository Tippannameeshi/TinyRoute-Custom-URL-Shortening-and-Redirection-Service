import React, { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw } from "lucide-react";

import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../api/adminApi";

import { UrlTable } from "../components/admin/UrlTable";
import { Pagination } from "../components/common/Pagination";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { toast } from "../components/ui/Toast";

export const AdminUrlsPage = () => {
  const { fetchUrls } = useAdmin();

  const [data, setData] = useState({
    urls: [],
    pagination: {
      page: 1,
      totalPages: 1,
    },
  });

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selectedUrl, setSelectedUrl] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const result = await fetchUrls({
        page,
        search,
        limit: 10,
      });

      setData(result);
    } catch {
      toast.error("Failed to load URLs");
    } finally {
      setLoading(false);
    }
  }, [fetchUrls, page, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async () => {
    if (!selectedUrl) return;

    try {
      setDeleteLoading(true);

      await adminApi.deleteUrl(selectedUrl.id);

      toast.success("Short URL deleted successfully");

      setSelectedUrl(null);

      loadData();
    } catch {
      toast.error("Failed to delete URL");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Global URL Management
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              View, search, and manage every shortened URL across the platform.
            </p>
          </div>

          <Button variant="outline" icon={RefreshCw} onClick={loadData}>
            Refresh
          </Button>
        </div>

        {/* Search */}
        <Card>
          <Input
            icon={Search}
            placeholder="Search by title, alias, short code or destination URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Card>

        {/* Table */}
        {loading ? (
          <Card className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </Card>
        ) : (
          <>
            <UrlTable
              urls={data.urls}
              onDelete={(url) => setSelectedUrl(url)}
            />

            {data.pagination.totalPages > 1 && (
              <Pagination
                currentPage={data.pagination.page}
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={!!selectedUrl}
        onClose={() => setSelectedUrl(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Short URL"
        confirmText="Delete URL"
        message={`Are you sure you want to permanently delete "${
          selectedUrl?.title || selectedUrl?.short_code || "this URL"
        }"? This action cannot be undone.`}
      />
    </>
  );
};
