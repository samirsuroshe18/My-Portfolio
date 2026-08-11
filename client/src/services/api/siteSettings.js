import { apiClient, unwrap } from './client.js';

export const siteSettingsApi = {
  getPublic: () => unwrap(apiClient.get('/site-settings')),
  getAdmin: () => unwrap(apiClient.get('/admin/site-settings')),
  save: (data) => unwrap(apiClient.put('/admin/site-settings', data)),
};
