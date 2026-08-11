import { experienceApi } from './experience.js';
import { educationApi } from './education.js';
import { projectsApi } from './projects.js';
import { openSourceApi } from './openSource.js';
import { hackathonsApi } from './hackathons.js';
import { blogsApi } from './blogs.js';
import { socialLinksApi } from './socialLinks.js';
import { skillCategoriesApi, skillItemsApi } from './skills.js';

/** Maps admin resource keys to their CRUD API module, for generic list/form hooks. */
export const RESOURCE_API = {
  experience: experienceApi,
  education: educationApi,
  projects: projectsApi,
  openSource: openSourceApi,
  hackathons: hackathonsApi,
  blogs: blogsApi,
  socialLinks: socialLinksApi,
  skillCategories: skillCategoriesApi,
  skills: skillItemsApi,
};
