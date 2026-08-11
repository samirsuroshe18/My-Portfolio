import { createResourceApi } from './resource.js';

export const projectsApi = createResourceApi({ publicPath: '/projects', adminPath: '/admin/projects' });
