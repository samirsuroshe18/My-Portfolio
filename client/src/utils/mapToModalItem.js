import { formatDateRange, formatDate } from './formatDate.js';

export function mapProjectToModal(project) {
  const actions = [];
  if (project.githubUrl) actions.push({ label: 'View Code', href: project.githubUrl, variant: 'secondary' });
  if (project.youtubeUrl) actions.push({ label: 'Watch Demo', href: project.youtubeUrl, variant: 'danger' });
  if (project.liveUrl) {
    actions.push({ label: project.platform === 'android' ? 'Download App' : 'View Live', href: project.liveUrl, variant: 'primary' });
  }

  return {
    image: project.image,
    title: project.title,
    meta: formatDateRange(project.startDate, project.endDate, false),
    tags: project.tags,
    description: project.description,
    actions,
  };
}

export function mapHackathonToModal(hackathon) {
  const actions = [];
  if (hackathon.youtubeUrl) actions.push({ label: 'Watch Recap', href: hackathon.youtubeUrl, variant: 'danger' });
  if (hackathon.certificateUrl) actions.push({ label: 'View Certificate', href: hackathon.certificateUrl, variant: 'secondary' });
  // the live link, when there is one, is the main action; the code link steps back
  if (hackathon.githubUrl) {
    actions.push({ label: 'View Code', href: hackathon.githubUrl, variant: hackathon.liveUrl ? 'secondary' : 'primary' });
  }
  if (hackathon.liveUrl) actions.push({ label: 'View Live', href: hackathon.liveUrl, variant: 'primary' });

  return {
    image: hackathon.image,
    title: hackathon.title,
    subtitle: hackathon.organizer,
    meta: hackathon.duration ? `${formatDate(hackathon.date)} • ${hackathon.duration}` : formatDate(hackathon.date),
    tags: hackathon.tags,
    description: hackathon.description,
    members: hackathon.members,
    sponsors: hackathon.sponsors,
    actions,
  };
}

export function mapOpenSourceToModal(item) {
  const actions = [];
  if (item.pullRequestUrl) actions.push({ label: 'View Pull Request', href: item.pullRequestUrl, variant: 'secondary' });
  if (item.repositoryUrl) actions.push({ label: 'View Repository', href: item.repositoryUrl, variant: 'primary' });

  return {
    image: item.image,
    title: item.title,
    subtitle: item.projectName,
    meta: `${formatDate(item.date)} • ${item.status}`,
    tags: item.tags,
    description: item.description,
    members: item.members,
    actions,
  };
}
