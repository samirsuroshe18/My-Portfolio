import { createResourceApi } from './resource.js';

export const hackathonsApi = createResourceApi({ publicPath: '/hackathons', adminPath: '/admin/hackathons' });
