import { useFetch } from './useFetch.js';
import { profileApi } from '../services/api/profile.js';
import { skillsApi } from '../services/api/skills.js';
import { experienceApi } from '../services/api/experience.js';
import { educationApi } from '../services/api/education.js';
import { projectsApi } from '../services/api/projects.js';
import { openSourceApi } from '../services/api/openSource.js';
import { hackathonsApi } from '../services/api/hackathons.js';
import { blogsApi } from '../services/api/blogs.js';
import { githubApi } from '../services/api/github.js';
import { siteSettingsApi } from '../services/api/siteSettings.js';

const FETCHERS = {
  profile: () => profileApi.getPublic(),
  skills: () => skillsApi.getAll(),
  experience: () => experienceApi.getAll(),
  education: () => educationApi.getAll(),
  projects: (params) => projectsApi.getAll(params),
  openSource: () => openSourceApi.getAll(),
  hackathons: () => hackathonsApi.getAll(),
  blogs: () => blogsApi.getAll(),
  github: () => githubApi.getPublic(),
  siteSettings: () => siteSettingsApi.getPublic(),
};

// Requests currently on the wire, so components asking for the same resource
// at the same time (Navbar, Hero, About and Footer all read the profile) share one call.
const inFlight = new Map();

function fetchShared(cacheKey, fetcher) {
  if (!inFlight.has(cacheKey)) {
    const request = fetcher().finally(() => inFlight.delete(cacheKey));
    inFlight.set(cacheKey, request);
  }
  return inFlight.get(cacheKey);
}

/**
 * Thin wrapper over useFetch mapping a resource key to its public API call,
 * so every public section fetches data through the same hook shape.
 */
export function usePortfolioData(resourceKey, params) {
  const fetcher = FETCHERS[resourceKey];
  if (!fetcher) throw new Error(`Unknown portfolio data resource: ${resourceKey}`);
  const paramsKey = JSON.stringify(params || {});
  return useFetch(() => fetchShared(`${resourceKey}:${paramsKey}`, () => fetcher(params)), [resourceKey, paramsKey]);
}
