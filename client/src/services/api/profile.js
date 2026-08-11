import { apiClient, unwrap } from './client.js';

export const profileApi = {
  getPublic: () => unwrap(apiClient.get('/profile')),
  getAdmin: () => unwrap(apiClient.get('/admin/profile')),
  save: (data) => unwrap(apiClient.put('/admin/profile', data)),
};
