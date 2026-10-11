import { describe, it, expect } from 'vitest';
import { platformKind, partitionProjects, projectLinks, pullRequestRef, pickGlance, pickProof, navHref, currentJobLabel, projectExtras, calendarWeeks, pickActiveSection, descriptionBlocks } from './portfolio.js';

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
    expect(projectLinks({ liveUrl: 'https://play.google.com/store/apps/details?id=x' })).toEqual([{ label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=x', kind: 'store' }]);
  });
  it('labels a GitHub release as an APK download', () => {
    expect(projectLinks({ liveUrl: 'https://github.com/u/r/releases/tag/v1' })[0]).toMatchObject({ label: 'Download APK', kind: 'apk' });
  });
  it('orders live, code, demo and skips empty strings', () => {
    expect(projectLinks({ liveUrl: 'https://a.app', githubUrl: 'https://github.com/u/r', youtubeUrl: '' }).map((l) => l.label)).toEqual(['Live demo', 'Source code']);
    expect(projectLinks({ youtubeUrl: 'https://youtu.be/x' }).map((l) => l.label)).toEqual(['Watch demo']);
    expect(projectLinks({ liveUrl: 'https://a.app', githubUrl: 'https://github.com/u/r', youtubeUrl: 'https://youtu.be/x' }).map((l) => l.kind)).toEqual(['live', 'code', 'demo']);
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
    const g = pickGlance(exp);
    expect(g.now._id).toBe(2);
    expect(g.before._id).toBe(1);
  });
  it('falls back to the first job when none is current', () => {
    expect(pickGlance([{ _id: 1 }, { _id: 2 }]).now._id).toBe(1);
  });
  it('returns nulls for missing data', () => {
    expect(pickGlance(null)).toEqual({ now: null, before: null });
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
      { title: 'A', text: 'a app', label: 'On the Play Store', href: 'https://play.google.com/x', kind: 'store' },
      { title: 'Anki', text: 'Fix', label: 'Pull request 1', href: 'https://github.com/o/r/pull/1', kind: 'pr' },
      { title: 'C', text: 'c app', label: 'Live demo', href: 'https://c.app', kind: 'live' },
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

describe('calendarWeeks', () => {
  // 2026-01-01 is a Thursday
  const days = ['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05'].map((date, i) => ({ date, level: i % 5 }));
  it('lays days out in Sunday-first weeks, padding the first one', () => {
    const { weeks } = calendarWeeks(days);
    expect(weeks).toHaveLength(2);
    expect(weeks[0].map((d) => d?.date ?? null)).toEqual([null, null, null, null, '2026-01-01', '2026-01-02', '2026-01-03']);
    expect(weeks[1].map((d) => d?.date ?? null)).toEqual(['2026-01-04', '2026-01-05']);
  });
  it('labels the column where each month starts', () => {
    const feb = Array.from({ length: 40 }, (_, i) => ({ date: new Date(Date.UTC(2026, 0, 1 + i)).toISOString().slice(0, 10), level: 0 }));
    expect(calendarWeeks(feb).months).toEqual([{ label: 'Jan', column: 0 }, { label: 'Feb', column: 5 }]);
  });
  it('drops a first label that would collide with the next one', () => {
    const late = Array.from({ length: 20 }, (_, i) => ({ date: new Date(Date.UTC(2026, 0, 28 + i)).toISOString().slice(0, 10), level: 0 }));
    expect(calendarWeeks(late).months).toEqual([{ label: 'Feb', column: 1 }]);
  });
  it('handles no data', () => {
    expect(calendarWeeks(null)).toEqual({ weeks: [], months: [] });
  });
});

describe('pickActiveSection', () => {
  const sections = [{ id: 'about', top: -900 }, { id: 'projects', top: -100 }, { id: 'skills', top: 500 }];
  it('picks the lowest section whose top has passed the reading line', () => {
    expect(pickActiveSection(sections, 300, false)).toBe('projects');
    expect(pickActiveSection(sections, 600, false)).toBe('skills');
  });
  it('does not depend on the order the sections are listed in', () => {
    expect(pickActiveSection([...sections].reverse(), 300, false)).toBe('projects');
  });
  it('picks nothing when no section has reached the line', () => {
    expect(pickActiveSection([{ id: 'about', top: 400 }], 300, false)).toBe('');
    expect(pickActiveSection([], 300, true)).toBe('');
  });
  it('picks the last section at the bottom of the page', () => {
    expect(pickActiveSection(sections, 300, true)).toBe('skills');
  });
});

describe('descriptionBlocks', () => {
  it('turns a labelled run of lines into a heading and a list, without the leading emoji', () => {
    const text = 'An app for societies.\n\n\u2728 Key Features:\n\uD83D\uDD11 Google Sign-In: quick login\n\uD83D\uDD14 Notifications: instant\n\n\uD83D\uDEE0\uFE0F Tech Stack:\nFrontend: Flutter';
    expect(descriptionBlocks(text)).toEqual([
      { type: 'paragraph', text: 'An app for societies.' },
      { type: 'heading', text: 'Key Features' },
      { type: 'list', items: ['Google Sign-In: quick login', 'Notifications: instant'] },
      { type: 'heading', text: 'Tech Stack' },
      { type: 'list', items: ['Frontend: Flutter'] },
    ]);
  });
  it('keeps plain paragraphs as they are', () => {
    expect(descriptionBlocks('One.\n\nTwo.')).toEqual([{ type: 'paragraph', text: 'One.' }, { type: 'paragraph', text: 'Two.' }]);
    expect(descriptionBlocks('Line a\nLine b')).toEqual([{ type: 'paragraph', text: 'Line a\nLine b' }]);
  });
  it('does not treat a long sentence ending in a colon as a heading', () => {
    const long = 'This is a long sentence that happens to end with a colon for some reason:';
    expect(descriptionBlocks(long)).toEqual([{ type: 'paragraph', text: long }]);
  });
  it('handles empty input', () => {
    expect(descriptionBlocks('')).toEqual([]);
    expect(descriptionBlocks(undefined)).toEqual([]);
  });
});
