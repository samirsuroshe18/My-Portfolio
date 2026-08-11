import { SiteSettings } from '../models/SiteSettings.js';

export async function seedSiteSettings() {
  await SiteSettings.findOneAndUpdate(
    {},
    {
      logoText: 'Aarav.dev',
      navItems: [
        { label: 'About', href: '#about', order: 0 },
        { label: 'Skills', href: '#skills', order: 1 },
        { label: 'Experience', href: '#experience', order: 2 },
        { label: 'Projects', href: '#projects', order: 3 },
        { label: 'Education', href: '#education', order: 4 },
        { label: 'Blog', href: '#blog', order: 5 },
        { label: 'Contact', href: '#contact', order: 6 },
      ],
      footerText: `© ${new Date().getFullYear()} Aarav Mehta. All rights reserved.`,
      accentColor: '#854CE6',
      showGithubButton: true,
      metaTitle: 'Aarav Mehta — Full Stack & Mobile Developer',
      metaDescription: 'Portfolio of Aarav Mehta, a full stack and mobile app developer specializing in the MERN stack and Flutter.',
    },
    { upsert: true, setDefaultsOnInsert: true }
  );

  return { created: true, count: 1 };
}
