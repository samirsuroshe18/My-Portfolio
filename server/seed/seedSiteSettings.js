import { SiteSettings } from '../models/SiteSettings.js';

export async function seedSiteSettings() {
  await SiteSettings.findOneAndUpdate(
    {},
    {
      logoText: "Samir's Portfolio",
      navItems: [
        { label: 'About', href: '#about', order: 0 },
        { label: 'Skills', href: '#skills', order: 1 },
        { label: 'Experience', href: '#experience', order: 2 },
        { label: 'Projects', href: '#projects', order: 3 },
        { label: 'Education', href: '#education', order: 4 },
        { label: 'Blog', href: '#blog', order: 5 },
        { label: 'Contact', href: '#contact', order: 6 },
      ],
      footerText: `© ${new Date().getFullYear()} Samir Suroshe. All rights reserved.`,
      showGithubButton: true,
      metaTitle: 'Samir Suroshe',
      metaDescription:
        'Software Developer skilled in full-stack web and mobile app development using Flutter, React, and Node.js. Proficient in native Android development with Java and Kotlin, and experienced in deploying cloud-based applications on AWS.',
    },
    { upsert: true, setDefaultsOnInsert: true }
  );

  return { created: true, count: 1 };
}
