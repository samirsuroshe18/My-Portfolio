import { Experience } from '../models/Experience.js';

const DATA = [
  {
    companyLogo: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466721/my-portfolio/smartdwell_des6a9.png',
    role: 'Software Developer',
    company: 'Smartdwell Technologies',
    startDate: new Date('2024-05-01'),
    endDate: null,
    isCurrent: true,
    description:
      "I was responsible for creating software solutions that aligned with the business needs. Developed a visitor management app that now supports 100+ daily users, along with a water level indication app built with Flutter. Built and deployed 3+ React-based apps on AWS ec2, helping streamline internal processes. Contributed to shaping the company's software capabilities, improving both operational efficiency and the user experience.",
    technologies: ['React', 'Flutter', 'AWS EC2'],
    order: 0,
  },
  {
    companyLogo: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466678/my-portfolio/ignitech_w5fovy.png',
    role: 'Android Developer',
    company: 'Ignitech',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-07-31'),
    isCurrent: false,
    description:
      'Designed and implemented user-friendly interfaces using XML and Java, improving overall user experience and accessibility. Developed and maintained app features using Android Studio, Java, XML, SQLite, and sensors, ensuring seamless functionality and performance.',
    technologies: ['Java', 'XML', 'Android Studio', 'SQLite'],
    certificateUrl: 'https://drive.google.com/file/d/1TyqB2LAeX_m2yAI2091QmU-YXxbv4Uwp/view?usp=sharing',
    order: 1,
  },
];

export async function seedExperience() {
  const existingCount = await Experience.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await Experience.insertMany(DATA);
  return { created: true, count: DATA.length };
}
