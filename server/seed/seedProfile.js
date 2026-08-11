import { UserProfile } from '../models/UserProfile.js';
import { SocialLink } from '../models/SocialLink.js';

export async function seedProfile() {
  await UserProfile.findOneAndUpdate(
    {},
    {
      name: 'Samir Suroshe',
      headline: '',
      roles: ['Mobile Developer', 'Full Stack Developer', 'MERN Developer', 'DevOps Engineer'],
      shortBio: '',
      description:
        'Software Developer skilled in full-stack web and mobile app development using Flutter, React, and Node.js. Proficient in native Android development with Java and Kotlin, and experienced in deploying cloud-based applications on AWS. Passionate about solving real-world problems, writing clean code, and collaborating on impactful projects.',
      avatarUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466729/my-portfolio/samir_qblgwh.jpg',
      location: '',
      availability: '',
      githubUrl: 'https://github.com/samirsuroshe18',
      linkedinUrl: 'https://www.linkedin.com/in/samir-suroshe/',
      twitterUrl: 'https://x.com/SamirSuroshe',
      mediumUrl: 'https://medium.com/@sameersuroshe50',
      resumeUrl: 'https://drive.google.com/file/d/1-CLSqsK0fE5eJKRaPGMUzzsMIjrtxV7f/view?usp=sharing',
      contactEmail: 'sameersuroshe50@gmail.com',
      isActive: true,
    },
    { upsert: true, setDefaultsOnInsert: true }
  );

  const socialLinks = [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/samirsuroshe18', order: 0 },
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/samir-suroshe/', order: 1 },
    { platform: 'twitter', label: 'Twitter', url: 'https://x.com/SamirSuroshe', order: 2 },
    { platform: 'medium', label: 'Medium', url: 'https://medium.com/@sameersuroshe50', order: 3 },
    { platform: 'mail', label: 'Email', url: 'mailto:sameersuroshe50@gmail.com', order: 4 },
  ];

  let count = 0;
  for (const link of socialLinks) {
    await SocialLink.findOneAndUpdate({ platform: link.platform }, link, { upsert: true, setDefaultsOnInsert: true });
    count += 1;
  }

  return { created: true, count: count + 1 };
}
