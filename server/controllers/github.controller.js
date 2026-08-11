import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { GitHubProfile } from '../models/GitHubProfile.js';
import { SiteSettings } from '../models/SiteSettings.js';
import { buildContributionChartUrl, isValidGithubUsername } from '../utils/githubClient.js';

export const getPublicGithub = asyncHandler(async (req, res) => {
  const [profile, settings] = await Promise.all([GitHubProfile.findOne(), SiteSettings.findOne()]);

  const username = profile?.username || '';
  const available = Boolean(profile?.displayContributionGraph && isValidGithubUsername(username));

  if (!available) {
    return res.json(new ApiResponse(200, 'GitHub activity', { available: false }));
  }

  const accentColor = settings?.accentColor || '#854CE6';
  res.json(
    new ApiResponse(200, 'GitHub activity', {
      available: true,
      username,
      chartUrl: buildContributionChartUrl(username, accentColor),
      profileUrl: `https://github.com/${username}`,
    })
  );
});

export const getAdminGithubConfig = asyncHandler(async (req, res) => {
  const profile = (await GitHubProfile.findOne()) || (await GitHubProfile.create({}));
  res.json(new ApiResponse(200, 'GitHub config', profile));
});

export const updateGithubConfig = asyncHandler(async (req, res) => {
  const profile = await GitHubProfile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res.json(new ApiResponse(200, 'GitHub config saved', profile));
});
