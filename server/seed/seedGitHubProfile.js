import { GitHubProfile } from '../models/GitHubProfile.js';

export async function seedGitHubProfile() {
  await GitHubProfile.findOneAndUpdate(
    {},
    { username: 'aaravmehta-dev', displayContributionGraph: true },
    { upsert: true, setDefaultsOnInsert: true }
  );
  return { created: true, count: 1 };
}
