import { apiClient, unwrap } from './client.js';

export const githubApi = {
  getPublic: () => unwrap(apiClient.get('/github')),
  getAdminConfig: () => unwrap(apiClient.get('/admin/github/config')),
  saveConfig: (data) => unwrap(apiClient.put('/admin/github/config', data)),
};
