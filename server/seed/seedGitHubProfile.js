import { GitHubProfile } from '../models/GitHubProfile.js';

export async function seedGitHubProfile() {
  await GitHubProfile.findOneAndUpdate(
    {},
    { username: 'samirsuroshe18', displayContributionGraph: true },
    { upsert: true, setDefaultsOnInsert: true }
  );
  return { created: true, count: 1 };
}
