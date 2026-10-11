const MOBILE_PLATFORMS = ['android', 'ios'];
const PULL_REQUEST_URL = /github\.com\/([^/]+\/[^/]+)\/pull\/(\d+)/;

const KIND_LABEL = { mobile: 'Mobile app', web: 'Web app', other: 'Project' };

export function platformKind(platform) {
  if (MOBILE_PLATFORMS.includes(platform)) return 'mobile';
  if (platform === 'web') return 'web';
  return 'other';
}

export function kindLabel(platform) {
  return KIND_LABEL[platformKind(platform)];
}

/** Splits projects into the featured ones and the rest for the chosen filter; counts cover the whole list. */
export function partitionProjects(projects, kind) {
  const list = projects || [];
  const counts = {
    all: list.length,
    mobile: list.filter((project) => platformKind(project.platform) === 'mobile').length,
    web: list.filter((project) => platformKind(project.platform) === 'web').length,
  };
  const visible = kind === 'all' ? list : list.filter((project) => platformKind(project.platform) === kind);

  return {
    featured: visible.filter((project) => project.isFeatured),
    rest: visible.filter((project) => !project.isFeatured),
    counts,
  };
}

// `kind` tells the link list which icon to draw in front of the label
function liveLink(url) {
  if (url.includes('play.google.com')) return { label: 'Play Store', href: url, kind: 'store' };
  if (url.includes('/releases/')) return { label: 'Download APK', href: url, kind: 'apk' };
  return { label: 'Live demo', href: url, kind: 'live' };
}

export function projectLinks(project) {
  const links = [];
  if (project.liveUrl) links.push(liveLink(project.liveUrl));
  if (project.githubUrl) links.push({ label: 'Source code', href: project.githubUrl, kind: 'code' });
  if (project.youtubeUrl) links.push({ label: 'Watch demo', href: project.youtubeUrl, kind: 'demo' });
  return links;
}

/** "https://github.com/owner/repo/pull/12" becomes "owner/repo #12". */
export function pullRequestRef(url) {
  const match = PULL_REQUEST_URL.exec(url || '');
  return match ? `${match[1]} #${match[2]}` : '';
}

/** The two lines of the summary card: the current job and the one before it. */
export function pickGlance(experience) {
  const jobs = experience || [];
  const now = jobs.find((job) => job.isCurrent) || jobs[0] || null;
  const before = jobs.find((job) => job !== now) || null;
  return { now, before };
}

function projectProof(project) {
  const onPlayStore = project.liveUrl.includes('play.google.com');
  return {
    title: project.title,
    // only the short description: this line is shown in full, so the long one would not fit
    text: project.shortDescription || '',
    label: onPlayStore ? 'On the Play Store' : 'Live demo',
    href: project.liveUrl,
    kind: onPlayStore ? 'store' : 'live',
  };
}

/** Up to three things a visitor can open straight away: a live project, a merged contribution, another live project. */
export function pickProof(projects, openSource) {
  const live = (projects || []).filter((project) => project.isFeatured && project.liveUrl);
  const contribution = (openSource || []).find((item) => item.pullRequestUrl);
  const proof = [];

  if (live[0]) proof.push(projectProof(live[0]));
  if (contribution) {
    const number = PULL_REQUEST_URL.exec(contribution.pullRequestUrl)?.[2];
    proof.push({
      title: contribution.projectName,
      text: contribution.title,
      label: number ? `Pull request ${number}` : 'Pull request',
      href: contribution.pullRequestUrl,
      kind: 'pr',
    });
  }
  if (live[1]) proof.push(projectProof(live[1]));

  return proof;
}

/** Section links ("#projects") are pointed at the home page so they also work from other pages; anything else is left as written. */
export function navHref(href) {
  if (!href) return '/';
  return href.startsWith('#') ? `/${href}` : href;
}

export function currentJobLabel(job) {
  return job.isCurrent ? 'Now' : 'Latest';
}

/** What a project keeps behind "More details": its highlight points and the full description. */
export function projectExtras(project) {
  const summary = project.shortDescription || project.description || '';
  const fullDescription = project.description && project.description !== summary ? project.description : '';
  const highlights = project.highlights || [];
  return { summary, fullDescription, highlights, hasMore: highlights.length > 0 || Boolean(fullDescription) };
}
