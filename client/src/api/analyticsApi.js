import axiosClient from './axiosClient';

export const analyticsApi = {
  getOverview: (range = '30d') => axiosClient.get('/analytics/overview', { params: { range } }),
  getUrlAnalytics: (urlId, range = '30d') => axiosClient.get(`/analytics/url/${urlId}`, { params: { range } })
};
