import { apiClient, unwrap, unwrapWithMeta } from './client.js';

/**
 * Builds a standard set of API functions for a resource that has a public
 * read path and an admin CRUD path (e.g. public "/experience" + admin "/admin/experience").
 */
export function createResourceApi({ publicPath, adminPath }) {
  return {
    getAll: (params) => unwrap(apiClient.get(publicPath, { params })),
    getById: (id) => unwrap(apiClient.get(`${publicPath}/${id}`)),

    adminList: (params) => unwrapWithMeta(apiClient.get(adminPath, { params })),
    adminGetById: (id) => unwrap(apiClient.get(`${adminPath}/${id}`)),
    create: (data) => unwrap(apiClient.post(adminPath, data)),
    update: (id, data) => unwrap(apiClient.put(`${adminPath}/${id}`, data)),
    remove: (id) => unwrap(apiClient.delete(`${adminPath}/${id}`)),
    reorder: (items) => unwrap(apiClient.patch(`${adminPath}/reorder`, items)),
  };
}
