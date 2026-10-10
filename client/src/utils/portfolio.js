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

function liveLabel(url) {
  if (url.includes('play.google.com')) return 'Play Store';
  if (url.includes('/releases/')) return 'Download APK';
  return 'Live demo';
}

export function projectLinks(project) {
  const links = [];
  if (project.liveUrl) links.push({ label: liveLabel(project.liveUrl), href: project.liveUrl });
  if (project.githubUrl) links.push({ label: 'Source code', href: project.githubUrl });
  if (project.youtubeUrl) links.push({ label: 'Watch demo', href: project.youtubeUrl });
  return links;
}

/** "https://github.com/owner/repo/pull/12" becomes "owner/repo #12". */
export function pullRequestRef(url) {
  const match = PULL_REQUEST_URL.exec(url || '');
  return match ? `${match[1]} #${match[2]}` : '';
}

/** The three lines of the summary card: current job, the one before it, and education. */
export function pickGlance(experience, education) {
  const jobs = experience || [];
  const now = jobs.find((job) => job.isCurrent) || jobs[0] || null;
  const before = jobs.find((job) => job !== now) || null;
  return { now, before, education: education?.[0] || null };
}

function projectProof(project) {
  return {
    title: project.title,
    text: project.shortDescription || project.description || '',
    label: project.liveUrl.includes('play.google.com') ? 'On the Play Store' : 'Live demo',
    href: project.liveUrl,
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
    });
  }
  if (live[1]) proof.push(projectProof(live[1]));

  return proof;
}
