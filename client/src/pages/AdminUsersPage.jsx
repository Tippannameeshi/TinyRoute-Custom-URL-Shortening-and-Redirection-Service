import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { Pagination } from '../components/common/Pagination';
import { formatDate } from '../utils/formatters';
import { adminApi } from '../api/adminApi';
import { Search, UserCheck, UserX, Trash2 } from 'lucide-react';
import { toast } from '../components/ui/Toast';

export const AdminUsersPage = () => {
  const { fetchUsers } = useAdmin();
  const [data, setData] = useState({ users: [], pagination: { page: 1, totalPages: 1 } });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedUserForDelete, setSelectedUserForDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    fetchUsers({ page, search, limit: 10 })
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [fetchUsers, page, search]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleStatus = async (userId, is_active) => {
    try {
      await adminApi.updateUserStatus(userId, is_active);
      toast.success(`User status updated to ${is_active ? 'Active' : 'Deactivated'}`);
      loadData();
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const handleChangeRole = async (userId, role) => {
    try {
      await adminApi.updateUserRole(userId, role);
      toast.success(`User role updated to ${role}`);
      loadData();
    } catch (err) {
      toast.error('Failed to update user role');
    }
  };

  const confirmDeleteUser = async () => {
    if (!selectedUserForDelete) return;
    setDeleteLoading(true);
    try {
      await adminApi.deleteUser(selectedUserForDelete.id);
      toast.success('User deleted successfully');
      setSelectedUserForDelete(null);
      loadData();
    } catch (err) {
      toast.error('Failed to delete user');
    } finally {
      setDeleteLoading(false);
    }
  };

  const columns = [
    { header: 'ID', key: 'id', render: (val) => <span className="font-mono text-xs">{val}</span> },
    {
      header: 'User Name',
      key: 'first_name',
      render: (_, row) => (
        <span className="font-bold text-slate-900 dark:text-white">
          {row.first_name} {row.last_name}
        </span>
      )
    },
    { header: 'Email', key: 'email', render: (val) => <span className="text-xs font-mono">{val}</span> },
    {
      header: 'Role',
      key: 'role',
      render: (val, row) => (
        <select
          value={val}
          onChange={(e) => handleChangeRole(row.id, e.target.value)}
          className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-xs font-bold px-2 py-1"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      )
    },
    {
      header: 'Status',
      key: 'is_active',
      render: (val) => (val ? <Badge variant="active">Active</Badge> : <Badge variant="disabled font-bold">Deactivated</Badge>)
    },
    { header: 'Joined', key: 'created_at', render: (val) => <span className="text-xs">{formatDate(val)}</span> },
    {
      header: 'Actions',
      key: 'actions',
      cellClassName: 'text-right',
      render: (_, row) => (
        <div className="flex justify-end space-x-2">
          <Button
            size="sm"
            variant={row.is_active ? 'outline' : 'primary'}
            onClick={() => handleToggleStatus(row.id, !row.is_active)}
            icon={row.is_active ? UserX : UserCheck}
          >
            {row.is_active ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setSelectedUserForDelete(row)}
            icon={Trash2}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Enterprise User Directory</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Search registered users, manage roles, or toggle account status</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex items-center space-x-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by user name or email..."
          className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
        />
      </div>

      <Table columns={columns} data={data.users} loading={loading} emptyMessage="No users found" />

      <Pagination
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={setPage}
      />

      <ConfirmationModal
        isOpen={!!selectedUserForDelete}
        onClose={() => setSelectedUserForDelete(null)}
        onConfirm={confirmDeleteUser}
        title="Delete User Account"
        message={`Are you sure you want to delete user ${selectedUserForDelete?.first_name} ${selectedUserForDelete?.last_name}? All associated URLs will be permanently deleted.`}
        loading={deleteLoading}
      />
    </div>
  );
};
