import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';

export const apiClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem('admin_token')) {
      localStorage.removeItem('admin_token');
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export function unwrap(promise) {
  return promise.then((res) => res.data.data);
}

export function unwrapWithMeta(promise) {
  return promise.then((res) => ({ data: res.data.data, meta: res.data.meta }));
}

export function apiErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Something went wrong';
}
