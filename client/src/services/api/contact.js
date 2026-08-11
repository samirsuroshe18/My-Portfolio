import { apiClient, unwrap, unwrapWithMeta } from './client.js';

export const contactApi = {
  submit: (data) => unwrap(apiClient.post('/contact', data)),

  adminList: (params) => unwrapWithMeta(apiClient.get('/admin/contact', { params })),
  adminGetById: (id) => unwrap(apiClient.get(`/admin/contact/${id}`)),
  updateStatus: (id, status) => unwrap(apiClient.patch(`/admin/contact/${id}/status`, { status })),
  remove: (id) => unwrap(apiClient.delete(`/admin/contact/${id}`)),
};
