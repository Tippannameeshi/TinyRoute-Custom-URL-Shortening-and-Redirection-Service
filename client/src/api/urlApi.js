import axiosClient from './axiosClient';

export const urlApi = {
  createUrl: (data) => axiosClient.post('/urls', data),
  bulkCreateUrls: (urls) => axiosClient.post('/urls/bulk', { urls }),
  getUrls: (params) => axiosClient.get('/urls', { params }),
  getUrlById: (id) => axiosClient.get(`/urls/${id}`),
  updateUrl: (id, data) => axiosClient.put(`/urls/${id}`, data),
  deleteUrl: (id) => axiosClient.delete(`/urls/${id}`),
  toggleStatus: (id) => axiosClient.patch(`/urls/${id}/toggle-status`),
  toggleFavorite: (id) => axiosClient.patch(`/urls/${id}/toggle-favorite`),
  getQrCode: (id) => axiosClient.get(`/urls/${id}/qr`),

  // Public redirection API endpoints
  getRedirectInfo: (shortCode) => axiosClient.get(`/redirect/${shortCode}`),
  verifyPassword: (shortCode, password) => axiosClient.post(`/redirect/${shortCode}/verify`, { password })
};
