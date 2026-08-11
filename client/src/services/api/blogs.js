import { createResourceApi } from './resource.js';

export const blogsApi = createResourceApi({ publicPath: '/blogs', adminPath: '/admin/blogs' });
