import axiosClient from './axiosClient';

export const userApi = {
  getSettings: () => axiosClient.get('/user/settings'),
  updateSettings: (data) => axiosClient.put('/user/settings', data)
};
