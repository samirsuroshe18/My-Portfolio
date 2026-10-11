import { env } from '../config/env.js';

const USERNAME_PATTERN = /^[a-zA-Z0-9-]{1,39}$/;

export function isValidGithubUsername(username) {
  return typeof username === 'string' && USERNAME_PATTERN.test(username);
}

/** Builds the embeddable contribution-chart image URL (see plan: no GitHub token needed). */
export function buildContributionChartUrl(username, accentColorHex = '0E6B5E') {
  const color = accentColorHex.replace('#', '');
  return `${env.githubChartBaseUrl}/${color}/${username}`;
}

const CALENDAR_CELL = /<td[^>]*class="ContributionCalendar-day"[^>]*>/g;
const CALENDAR_TIMEOUT_MS = 4000;

/** Reads the days and their activity level (0-4) out of GitHub's public contribution calendar markup. */
export function parseContributionCalendar(html) {
  const days = [];
  for (const cell of html.match(CALENDAR_CELL) || []) {
    const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(cell)?.[1];
    const level = /data-level="([0-4])"/.exec(cell)?.[1];
    if (date && level) days.push({ date, level: Number(level) });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  const total = /([\d,]+)\s+contributions?\s+in the last year/.exec(html)?.[1];
  return { total: total ? Number(total.replace(/,/g, '')) : null, days };
}

/**
 * The same calendar a signed-out visitor sees on the GitHub profile. Returns null when it
 * cannot be read, so the page can fall back to the chart image.
 */
export async function fetchContributionCalendar(username) {
  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { 'User-Agent': 'portfolio-server' },
      signal: AbortSignal.timeout(CALENDAR_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const calendar = parseContributionCalendar(await response.text());
    return calendar.days.length > 0 ? calendar : null;
  } catch {
    return null;
  }
}
