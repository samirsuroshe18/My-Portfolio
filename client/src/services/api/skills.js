import { apiClient, unwrap, unwrapWithMeta } from './client.js';

export const skillsApi = {
  getAll: () => unwrap(apiClient.get('/skills')),
};

export const skillCategoriesApi = {
  adminList: (params) => unwrapWithMeta(apiClient.get('/admin/skill-categories', { params })),
  adminGetById: (id) => unwrap(apiClient.get(`/admin/skill-categories/${id}`)),
  create: (data) => unwrap(apiClient.post('/admin/skill-categories', data)),
  update: (id, data) => unwrap(apiClient.put(`/admin/skill-categories/${id}`, data)),
  remove: (id) => unwrap(apiClient.delete(`/admin/skill-categories/${id}`)),
  reorder: (items) => unwrap(apiClient.patch('/admin/skill-categories/reorder', items)),
};

export const skillItemsApi = {
  adminList: (params) => unwrapWithMeta(apiClient.get('/admin/skills', { params })),
  adminGetById: (id) => unwrap(apiClient.get(`/admin/skills/${id}`)),
  create: (data) => unwrap(apiClient.post('/admin/skills', data)),
  update: (id, data) => unwrap(apiClient.put(`/admin/skills/${id}`, data)),
  remove: (id) => unwrap(apiClient.delete(`/admin/skills/${id}`)),
  reorder: (items) => unwrap(apiClient.patch('/admin/skills/reorder', items)),
};
