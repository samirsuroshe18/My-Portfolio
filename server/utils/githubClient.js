import { env } from '../config/env.js';

const USERNAME_PATTERN = /^[a-zA-Z0-9-]{1,39}$/;

export function isValidGithubUsername(username) {
  return typeof username === 'string' && USERNAME_PATTERN.test(username);
}

/** Builds the embeddable contribution-chart image URL (see plan: no GitHub token needed). */
export function buildContributionChartUrl(username, accentColorHex = '854CE6') {
  const color = accentColorHex.replace('#', '');
  return `${env.githubChartBaseUrl}/${color}/${username}`;
}
