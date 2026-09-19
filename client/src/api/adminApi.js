import axiosClient from './axiosClient';

export const adminApi = {
  getUsers: (params) => axiosClient.get('/admin/users', { params }),
  updateUserStatus: (id, is_active) => axiosClient.patch(`/admin/users/${id}/status`, { is_active }),
  updateUserRole: (id, role) => axiosClient.patch(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => axiosClient.delete(`/admin/users/${id}`),

  getAllUrls: (params) => axiosClient.get('/admin/urls', { params }),
  deleteUrl: (id) => axiosClient.delete(`/admin/urls/${id}`),

  getAuditLogs: (params) => axiosClient.get('/admin/audit-logs', { params }),
  getGlobalStats: () => axiosClient.get('/admin/stats')
};
