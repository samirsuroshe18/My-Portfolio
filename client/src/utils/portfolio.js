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
  // an APK download page is not something a visitor can try straight away, so it does not count here
  const live = (projects || []).filter((project) => project.isFeatured && project.liveUrl && !project.liveUrl.includes('/releases/'));
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

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const utcDate = (date) => new Date(`${date}T00:00:00Z`);

/**
 * Arranges contribution days ({ date: 'YYYY-MM-DD', level }) the way GitHub draws them:
 * one column per week, Sunday at the top, with a label on the column where each month starts.
 */
export function calendarWeeks(days) {
  const list = days || [];
  if (list.length === 0) return { weeks: [], months: [] };

  const weeks = [Array(utcDate(list[0].date).getUTCDay()).fill(null)];
  for (const day of list) {
    if (weeks.at(-1).length === 7) weeks.push([]);
    weeks.at(-1).push(day);
  }

  const months = [];
  weeks.forEach((week, column) => {
    const month = utcDate(week.find(Boolean).date).getUTCMonth();
    if (months.length === 0 || months.at(-1).month !== month) months.push({ label: MONTH_LABELS[month], column, month });
  });
  // a short first month would sit on top of the next label
  if (months.length > 1 && months[1].column - months[0].column < 3) months.shift();

  return { weeks, months: months.map(({ label, column }) => ({ label, column })) };
}

/**
 * Which section the reader is in: the lowest one whose top has passed the reading line.
 * At the very bottom of the page the last section wins, since a short final section never reaches the line.
 */
export function pickActiveSection(sections, line, atBottom) {
  if (sections.length === 0) return '';
  const byPosition = [...sections].sort((a, b) => a.top - b.top);
  if (atBottom) return byPosition.at(-1).id;
  return byPosition.filter((section) => section.top <= line).at(-1)?.id || '';
}

const LEADING_SYMBOLS = /^[\p{Extended_Pictographic}️‍\s]+/u;
const HEADING_MAX_LENGTH = 40;

/**
 * Breaks a free-text description into paragraphs, headings and lists so it can be typeset.
 * A short line ending in a colon starts a list of the lines under it; emoji used as bullets are dropped.
 */
export function descriptionBlocks(text) {
  const blocks = [];
  let paragraph = [];
  let list = null;

  const closeParagraph = () => {
    if (paragraph.length > 0) blocks.push({ type: 'paragraph', text: paragraph.join('\n') });
    paragraph = [];
  };

  for (const raw of (text || '').split('\n')) {
    const line = raw.replace(LEADING_SYMBOLS, '').trim();

    if (!line) {
      closeParagraph();
      list = null;
    } else if (line.endsWith(':') && line.length <= HEADING_MAX_LENGTH) {
      closeParagraph();
      blocks.push({ type: 'heading', text: line.slice(0, -1) });
      list = { type: 'list', items: [] };
      blocks.push(list);
    } else if (list) {
      list.items.push(line);
    } else {
      paragraph.push(line);
    }
  }
  closeParagraph();

  return blocks.filter((block) => block.type !== 'list' || block.items.length > 0);
}

/**
 * Splits projects into runs of neighbours that share a layout (featured or compact) without
 * changing their order, so the page can follow the saved order exactly while still drawing
 * featured projects large.
 */
export function projectRuns(projects) {
  const runs = [];
  for (const project of projects || []) {
    const featured = Boolean(project.isFeatured);
    const last = runs.at(-1);
    if (last && last.featured === featured) last.items.push(project);
    else runs.push({ featured, items: [project] });
  }
  return runs;
}
