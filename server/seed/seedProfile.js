import { UserProfile } from '../models/UserProfile.js';
import { SocialLink } from '../models/SocialLink.js';

export async function seedProfile() {
  await UserProfile.findOneAndUpdate(
    {},
    {
      name: 'Aarav Mehta',
      headline: 'Full Stack & Mobile App Developer',
      roles: ['Full Stack Developer', 'Mobile App Developer', 'MERN Developer', 'Cloud Enthusiast'],
      shortBio: 'I build fast, reliable products across web, mobile, and cloud.',
      description:
        'Software developer specializing in the MERN stack and cross-platform mobile apps with Flutter. I enjoy turning ambiguous problems into clean, maintainable systems, and have shipped production apps used by real businesses. Currently exploring GenAI-powered developer tooling.',
      avatarUrl: 'https://i.pravatar.cc/400?img=12',
      location: 'Pune, India',
      availability: 'Open to freelance & full-time opportunities',
      githubUrl: 'https://github.com/aaravmehta-dev',
      linkedinUrl: 'https://www.linkedin.com/in/aaravmehta-dev',
      twitterUrl: 'https://x.com/aaravmehta_dev',
      mediumUrl: 'https://medium.com/@aaravmehta.dev',
      resumeUrl: 'https://example.com/aarav-mehta-resume.pdf',
      contactEmail: 'aarav.mehta.dev@example.com',
      isActive: true,
    },
    { upsert: true, setDefaultsOnInsert: true }
  );

  const socialLinks = [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/aaravmehta-dev', order: 0 },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/aaravmehta-dev', order: 1 },
    { platform: 'twitter', label: 'Twitter', url: 'https://x.com/aaravmehta_dev', order: 2 },
    { platform: 'medium', label: 'Medium', url: 'https://medium.com/@aaravmehta.dev', order: 3 },
    { platform: 'mail', label: 'Email', url: 'mailto:aarav.mehta.dev@example.com', order: 4 },
  ];

  let count = 0;
  for (const link of socialLinks) {
    await SocialLink.findOneAndUpdate({ platform: link.platform }, link, { upsert: true, setDefaultsOnInsert: true });
    count += 1;
  }

  return { created: true, count: count + 1 };
}
