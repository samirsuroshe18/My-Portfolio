import { OpenSourceContribution } from '../models/OpenSourceContribution.js';

const DATA = [
  {
    title: 'Enter Key Handling in Sync AlertDialog',
    projectName: 'AnkiDroid (Android Flashcards App)',
    repositoryUrl: 'https://github.com/ankidroid/Anki-Android',
    pullRequestUrl: 'https://github.com/ankidroid/Anki-Android/pull/18354',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466700/my-portfolio/pullrequest_zkhlcv.jpg',
    description:
      "Enhanced AnkiDroid's sync error dialog by enabling the Enter key to directly trigger the OK button, improving accessibility and user experience. Implemented via an optional Enter key handler in AlertDialogs.",
    technologies: ['Android', 'Java', 'Open Source', 'UI/UX', 'Accessibility'],
    tags: ['Android', 'Java', 'Open Source', 'UI/UX', 'Accessibility'],
    status: 'Merged',
    release: 'AnkiDroid v2.21',
    date: new Date('2025-06-01'),
    members: [{ name: 'Samir Suroshe', avatarUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466729/my-portfolio/samir_qblgwh.jpg' }],
    order: 0,
  },
];

export async function seedOpenSource() {
  const existingCount = await OpenSourceContribution.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await OpenSourceContribution.insertMany(DATA);
  return { created: true, count: DATA.length };
}
