import { apiClient, unwrap, unwrapWithMeta } from './client.js';

export const socialLinksApi = {
  adminList: (params) => unwrapWithMeta(apiClient.get('/admin/social-links', { params })),
  adminGetById: (id) => unwrap(apiClient.get(`/admin/social-links/${id}`)),
  create: (data) => unwrap(apiClient.post('/admin/social-links', data)),
  update: (id, data) => unwrap(apiClient.put(`/admin/social-links/${id}`, data)),
  remove: (id) => unwrap(apiClient.delete(`/admin/social-links/${id}`)),
  reorder: (items) => unwrap(apiClient.patch('/admin/social-links/reorder', items)),
};
