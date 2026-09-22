import React, { useState, useEffect, useCallback } from "react";
import { Search, UserCheck, UserX, Trash2, RefreshCw } from "lucide-react";

import { useAdmin } from "../hooks/useAdmin";
import { adminApi } from "../api/adminApi";

import { Table } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { ConfirmationModal } from "../components/ui/ConfirmationModal";
import { Pagination } from "../components/common/Pagination";
import { toast } from "../components/ui/Toast";

import { formatDate } from "../utils/formatters";

export const AdminUsersPage = () => {
  const { fetchUsers } = useAdmin();

  const [data, setData] = useState({
    users: [],
    pagination: {
      page: 1,
      totalPages: 1,
    },
  });

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const result = await fetchUsers({
        page,
        search,
        limit: 10,
      });

      setData(result);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [fetchUsers, page, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleStatus = async (userId, active) => {
    try {
      await adminApi.updateUserStatus(userId, active);

      toast.success(
        `User ${active ? "activated" : "deactivated"} successfully`,
      );

      loadData();
    } catch {
      toast.error("Failed to update user status");
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      await adminApi.updateUserRole(userId, role);

      toast.success(`Role changed to ${role}`);

      loadData();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setDeleteLoading(true);

      await adminApi.deleteUser(selectedUser.id);

      toast.success("User deleted successfully");

      setSelectedUser(null);

      loadData();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    {
      header: "ID",
      key: "id",
      render: (value) => <span className="font-mono text-xs">{value}</span>,
    },
    {
      header: "User",
      key: "first_name",
      render: (_, row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {row.first_name} {row.last_name}
          </p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Role",
      key: "role",
      render: (value, row) => (
        <select
          value={value}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      ),
    },
    {
      header: "Status",
      key: "is_active",
      render: (value) =>
        value ? (
          <Badge variant="active">Active</Badge>
        ) : (
          <Badge variant="disabled">Inactive</Badge>
        ),
    },
    {
      header: "Joined",
      key: "created_at",
      render: (value) => <span className="text-xs">{formatDate(value)}</span>,
    },
    {
      header: "Actions",
      key: "actions",
      cellClassName: "text-right",
      render: (_, row) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant={row.is_active ? "outline" : "primary"}
            icon={row.is_active ? UserX : UserCheck}
            onClick={() => handleToggleStatus(row.id, !row.is_active)}
          >
            {row.is_active ? "Deactivate" : "Activate"}
          </Button>

          <Button
            size="sm"
            variant="danger"
            icon={Trash2}
            onClick={() => setSelectedUser(row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Enterprise User Directory
            </h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage registered users, roles and account status.
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
            placeholder="Search users by name or email..."
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
            <Table
              columns={columns}
              data={data.users}
              emptyMessage="No users found"
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
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete User"
        confirmText="Delete User"
        message={`Are you sure you want to permanently delete ${
          selectedUser?.first_name || ""
        } ${
          selectedUser?.last_name || ""
        }? This will also permanently delete all URLs owned by this user.`}
      />
    </>
  );
};
