import { HackathonAchievement } from '../models/HackathonAchievement.js';

const MEMBERS = [
  {
    name: 'Samir',
    avatarUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466729/my-portfolio/samir_qblgwh.jpg',
    githubUrl: 'https://github.com/samirsuroshe18',
    linkedinUrl: 'https://www.linkedin.com/in/samir-suroshe',
  },
  {
    name: 'Tanishq',
    avatarUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466724/my-portfolio/tanishq_fkvkja.jpg',
    githubUrl: 'https://github.com/TanishqMSD',
    linkedinUrl: 'https://www.linkedin.com/in/tanishq-kulkarni-0148682b6',
  },
  {
    name: 'Mohit',
    avatarUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466697/my-portfolio/mohit_hxfavi.jpg',
    githubUrl: 'https://github.com/mohit45v',
    linkedinUrl: 'https://www.linkedin.com/in/mohit45v/',
  },
  {
    name: 'Pranay',
    avatarUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466710/my-portfolio/pranay_frompl.jpg',
    githubUrl: 'https://github.com/pranaysanap',
    linkedinUrl: 'https://www.linkedin.com/in/pranay-sanap-0b09282b6/',
  },
];

const DATA = [
  {
    title: 'AdVise',
    organizer: 'Level SuperMind Hackathon 2025',
    date: new Date('2025-02-01'),
    duration: '24 Hours',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466724/my-portfolio/levelsupermind_nkb3wb.png',
    description:
      'Automated Research Tracking tool for Social Media Influencers. Features web scraping and GenAI integration for real-time content analysis and trend detection. Built during Level SuperMind Hackathon 2025 with 800+ coders.',
    tags: ['React Js', 'Node Js', 'Express Js', 'MongoDB', 'Tailwind', 'JWT', 'Gen AI', 'Web Scraping', 'Langchain'],
    certificateUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466694/my-portfolio/levelsupermindcert_wu5s28.png',
    githubUrl: 'https://github.com/TanishqMSD/socialmedia-analyzer',
    youtubeUrl: 'https://www.youtube.com/watch?v=P8no7VJU9aU',
    members: MEMBERS,
    sponsors: ['DataStax', 'AWS'],
    platformPartner: 'Find Coder.io',
    order: 0,
  },
  {
    title: 'College Transparency System',
    organizer: 'Hackfusion 2.O 2025',
    date: new Date('2025-02-01'),
    duration: '36 Hours',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466679/my-portfolio/hackfusion_ke4sv0.jpg',
    description:
      'Automated Transparent College System built at Hackfusion. Features digital voting, facilities booking, and complaint management with real-time status tracking and administrative dashboard.',
    tags: ['React Js', 'Node Js', 'Express Js', 'MongoDB', 'Tailwind', 'JWT'],
    certificateUrl: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466690/my-portfolio/hackfusioncert_rwl8uu.png',
    githubUrl: 'https://github.com/samirsuroshe18/level_supermind_hackathon_project',
    youtubeUrl: 'https://www.youtube.com/watch?v=P8no7VJU9aU',
    members: MEMBERS,
    sponsors: ['Qskmeidentity'],
    platformPartner: 'CSE/IT Department, SGGSIE&T',
    order: 1,
  },
];

export async function seedHackathons() {
  const existingCount = await HackathonAchievement.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await HackathonAchievement.insertMany(DATA);
  return { created: true, count: DATA.length };
}
