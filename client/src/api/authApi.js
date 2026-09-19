import axiosClient from './axiosClient';

export const authApi = {
  register: (data) => axiosClient.post('/auth/register', data),
  login: (data) => axiosClient.post('/auth/login', data),
  logout: () => axiosClient.post('/auth/logout'),
  refreshToken: () => axiosClient.post('/auth/refresh'),
  getProfile: () => axiosClient.get('/auth/profile'),
  updateProfile: (data) => axiosClient.put('/auth/profile', data),
  changePassword: (data) => axiosClient.post('/auth/change-password', data),
  forgotPassword: (data) => axiosClient.post('/auth/forgot-password', data),
  resetPassword: (data) => axiosClient.post('/auth/reset-password', data),
  verifyEmail: (token) => axiosClient.get(`/auth/verify-email?token=${token}`),
  resendVerification: () => axiosClient.post('/auth/resend-verification')
};
