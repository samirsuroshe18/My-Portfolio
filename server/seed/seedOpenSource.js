import { OpenSourceContribution } from '../models/OpenSourceContribution.js';

const DATA = [
  {
    title: 'Fix keyboard focus trap in sync dialog',
    projectName: 'NoteFlow (Flashcards App)',
    repositoryUrl: 'https://github.com/noteflow-oss/noteflow-android',
    pullRequestUrl: 'https://github.com/noteflow-oss/noteflow-android/pull/1842',
    image: 'https://picsum.photos/seed/noteflow-pr/800/500',
    description:
      'Enhanced the sync error dialog by wiring the Enter key to trigger the primary action, improving keyboard accessibility for desktop-emulator users.',
    technologies: ['Android', 'Java', 'Accessibility'],
    tags: ['Open Source', 'Accessibility', 'UI/UX'],
    status: 'Merged',
    release: 'v2.21',
    date: new Date('2025-06-10'),
    members: [{ name: 'Aarav Mehta', avatarUrl: 'https://i.pravatar.cc/150?img=12' }],
    order: 0,
  },
];

export async function seedOpenSource() {
  const existingCount = await OpenSourceContribution.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await OpenSourceContribution.insertMany(DATA);
  return { created: true, count: DATA.length };
}
