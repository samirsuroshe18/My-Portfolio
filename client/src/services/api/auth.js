import { apiClient, unwrap } from './client.js';

export const authApi = {
  login: (email, password) => unwrap(apiClient.post('/auth/login', { email, password })),
  me: () => unwrap(apiClient.get('/auth/me')),
  changePassword: (currentPassword, newPassword) =>
    unwrap(apiClient.post('/auth/change-password', { currentPassword, newPassword })),
};
