import { HackathonAchievement } from '../models/HackathonAchievement.js';

const DATA = [
  {
    title: 'TrendScope',
    organizer: 'SuperMind Hackathon 2025',
    date: new Date('2025-02-15'),
    duration: '24 Hours',
    image: 'https://picsum.photos/seed/trendscope/800/500',
    description:
      'An automated research-tracking tool for social media influencers, combining web scraping with a GenAI pipeline for real-time trend detection. Built in 24 hours among 800+ competing developers.',
    tags: ['React', 'Node.js', 'MongoDB', 'GenAI', 'Web Scraping', 'LangChain'],
    certificateUrl: 'https://example.com/certificates/supermind-2025.pdf',
    githubUrl: 'https://github.com/aaravmehta-dev/trendscope',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    members: [
      { name: 'Aarav Mehta', avatarUrl: 'https://i.pravatar.cc/150?img=12', githubUrl: 'https://github.com/aaravmehta-dev' },
      { name: 'Diya Kapoor', avatarUrl: 'https://i.pravatar.cc/150?img=45', githubUrl: 'https://github.com/diyakapoor' },
      { name: 'Rohan Iyer', avatarUrl: 'https://i.pravatar.cc/150?img=33', githubUrl: 'https://github.com/rohaniyer' },
    ],
    sponsors: ['DataStax', 'AWS'],
    platformPartner: 'FindCoder.io',
    order: 0,
  },
  {
    title: 'CampusVoice',
    organizer: 'HackForge 2.0',
    date: new Date('2025-02-22'),
    duration: '36 Hours',
    image: 'https://picsum.photos/seed/hackforge/800/500',
    description:
      'A transparent campus governance system with digital voting, facility booking, and complaint tracking, built with a live administrative dashboard during a 36-hour hackathon.',
    tags: ['React', 'Node.js', 'MongoDB', 'JWT'],
    certificateUrl: 'https://example.com/certificates/hackforge-2025.pdf',
    githubUrl: 'https://github.com/aaravmehta-dev/campusvoice',
    members: [
      { name: 'Aarav Mehta', avatarUrl: 'https://i.pravatar.cc/150?img=12', githubUrl: 'https://github.com/aaravmehta-dev' },
      { name: 'Diya Kapoor', avatarUrl: 'https://i.pravatar.cc/150?img=45', githubUrl: 'https://github.com/diyakapoor' },
    ],
    sponsors: ['QuickAuth'],
    platformPartner: 'Dept. of CSE, City Institute of Technology',
    order: 1,
  },
];

export async function seedHackathons() {
  const existingCount = await HackathonAchievement.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await HackathonAchievement.insertMany(DATA);
  return { created: true, count: DATA.length };
}
