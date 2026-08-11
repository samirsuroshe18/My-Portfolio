import { Experience } from '../models/Experience.js';

const DATA = [
  {
    role: 'Software Developer',
    company: 'Nimbus Cloud Labs',
    location: 'Pune, India (Hybrid)',
    startDate: new Date('2024-05-01'),
    endDate: null,
    isCurrent: true,
    description:
      'Building and maintaining internal tools and client-facing products across the MERN stack and Flutter, with a focus on reliability and developer velocity.',
    bulletPoints: [
      'Built a visitor management app used by 100+ daily users across two housing societies',
      'Shipped 3 React-based internal dashboards deployed on AWS EC2',
      'Introduced CI checks that cut regression bugs in production releases by half',
    ],
    technologies: ['React', 'Node.js', 'Flutter', 'MongoDB', 'AWS'],
    achievements: ['Reduced average deployment time from 40 minutes to under 10 minutes'],
    order: 0,
  },
  {
    role: 'Android Developer Intern',
    company: 'Brightpath Technologies',
    location: 'Remote',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-07-31'),
    isCurrent: false,
    description:
      'Worked on native Android features for a field-operations app, focusing on UI polish and sensor integrations.',
    bulletPoints: [
      'Redesigned two core screens using Material Components, improving usability feedback scores',
      'Integrated device sensors (GPS, accelerometer) for a location-tagging feature',
    ],
    technologies: ['Java', 'XML', 'Android Studio', 'SQLite'],
    certificateUrl: 'https://example.com/certificates/brightpath-internship.pdf',
    order: 1,
  },
];

export async function seedExperience() {
  const existingCount = await Experience.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await Experience.insertMany(DATA);
  return { created: true, count: DATA.length };
}
