import { describe, it, expect } from 'vitest';
import { platformKind, partitionProjects, projectLinks, pullRequestRef, pickGlance, pickProof, navHref, currentJobLabel, projectExtras } from './portfolio.js';

const p = (over) => ({ _id: over.title, title: 't', platform: 'web', isFeatured: false, ...over });

describe('platformKind', () => {
  it('groups android and ios as mobile', () => {
    expect(platformKind('android')).toBe('mobile');
    expect(platformKind('ios')).toBe('mobile');
    expect(platformKind('web')).toBe('web');
    expect(platformKind('desktop')).toBe('other');
    expect(platformKind(undefined)).toBe('other');
  });
});

describe('partitionProjects', () => {
  const list = [p({ title: 'a', isFeatured: true, platform: 'android' }), p({ title: 'b' }), p({ title: 'c', platform: 'ios' }), p({ title: 'd', platform: 'desktop' })];
  it('splits featured from the rest and keeps order', () => {
    const r = partitionProjects(list, 'all');
    expect(r.featured.map((x) => x.title)).toEqual(['a']);
    expect(r.rest.map((x) => x.title)).toEqual(['b', 'c', 'd']);
  });
  it('counts by kind regardless of the active filter', () => {
    expect(partitionProjects(list, 'web').counts).toEqual({ all: 4, mobile: 2, web: 1 });
  });
  it('filters both groups', () => {
    const r = partitionProjects(list, 'web');
    expect(r.featured).toEqual([]);
    expect(r.rest.map((x) => x.title)).toEqual(['b']);
  });
  it('handles null', () => {
    expect(partitionProjects(null, 'all')).toEqual({ featured: [], rest: [], counts: { all: 0, mobile: 0, web: 0 } });
  });
});

describe('projectLinks', () => {
  it('labels a Play Store link', () => {
    expect(projectLinks({ liveUrl: 'https://play.google.com/store/apps/details?id=x' })).toEqual([{ label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=x' }]);
  });
  it('labels a GitHub release as an APK download', () => {
    expect(projectLinks({ liveUrl: 'https://github.com/u/r/releases/tag/v1' })[0].label).toBe('Download APK');
  });
  it('orders live, code, demo and skips empty strings', () => {
    expect(projectLinks({ liveUrl: 'https://a.app', githubUrl: 'https://github.com/u/r', youtubeUrl: '' }).map((l) => l.label)).toEqual(['Live demo', 'Source code']);
    expect(projectLinks({ youtubeUrl: 'https://youtu.be/x' }).map((l) => l.label)).toEqual(['Watch demo']);
    expect(projectLinks({})).toEqual([]);
  });
});

describe('pullRequestRef', () => {
  it('formats owner/repo and number', () => {
    expect(pullRequestRef('https://github.com/ankidroid/Anki-Android/pull/18354')).toBe('ankidroid/Anki-Android #18354');
  });
  it('returns an empty string for anything else', () => {
    expect(pullRequestRef('https://example.com/x')).toBe('');
    expect(pullRequestRef(undefined)).toBe('');
  });
});

describe('pickGlance', () => {
  const exp = [{ _id: 1, isCurrent: false }, { _id: 2, isCurrent: true }, { _id: 3, isCurrent: false }];
  it('takes the current job as now and the first other job as before', () => {
    const g = pickGlance(exp, [{ _id: 9 }]);
    expect(g.now._id).toBe(2);
    expect(g.before._id).toBe(1);
    expect(g.education._id).toBe(9);
  });
  it('falls back to the first job when none is current', () => {
    expect(pickGlance([{ _id: 1 }, { _id: 2 }], []).now._id).toBe(1);
  });
  it('returns nulls for missing data', () => {
    expect(pickGlance(null, null)).toEqual({ now: null, before: null, education: null });
  });
});

describe('pickProof', () => {
  const projects = [
    p({ title: 'A', isFeatured: true, liveUrl: 'https://play.google.com/x', shortDescription: 'a app' }),
    p({ title: 'B', isFeatured: true, liveUrl: '' }),
    p({ title: 'C', isFeatured: true, liveUrl: 'https://c.app', shortDescription: 'c app' }),
    p({ title: 'D', liveUrl: 'https://d.app' }),
  ];
  const os = [{ projectName: 'Anki', title: 'Fix', pullRequestUrl: 'https://github.com/o/r/pull/1' }];
  it('returns featured live project, contribution, next featured live project', () => {
    expect(pickProof(projects, os)).toEqual([
      { title: 'A', text: 'a app', label: 'On the Play Store', href: 'https://play.google.com/x' },
      { title: 'Anki', text: 'Fix', label: 'Pull request 1', href: 'https://github.com/o/r/pull/1' },
      { title: 'C', text: 'c app', label: 'Live demo', href: 'https://c.app' },
    ]);
  });
  it('returns what exists', () => {
    expect(pickProof(null, null)).toEqual([]);
    expect(pickProof(projects, []).map((x) => x.title)).toEqual(['A', 'C']);
  });
});

describe('navHref', () => {
  it('points section links at the home page so they work from any page', () => {
    expect(navHref('#projects')).toBe('/#projects');
  });
  it('leaves page paths and full addresses alone', () => {
    expect(navHref('/resume')).toBe('/resume');
    expect(navHref('https://example.com')).toBe('https://example.com');
    expect(navHref(undefined)).toBe('/');
  });
});

describe('currentJobLabel', () => {
  it('says Now only for a job that is still current', () => {
    expect(currentJobLabel({ isCurrent: true })).toBe('Now');
    expect(currentJobLabel({ isCurrent: false })).toBe('Latest');
    expect(currentJobLabel({})).toBe('Latest');
  });
});

describe('projectExtras', () => {
  it('keeps highlights and the full description behind the toggle', () => {
    expect(projectExtras({ shortDescription: 'short', description: 'long', highlights: ['a'] })).toEqual({ summary: 'short', fullDescription: 'long', highlights: ['a'], hasMore: true });
  });
  it('has nothing more when the description is already the summary', () => {
    expect(projectExtras({ description: 'only' })).toEqual({ summary: 'only', fullDescription: '', highlights: [], hasMore: false });
    expect(projectExtras({})).toEqual({ summary: '', fullDescription: '', highlights: [], hasMore: false });
  });
});
