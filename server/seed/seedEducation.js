import { Education } from '../models/Education.js';

const DATA = [
  {
    institutionLogo: 'https://api.dicebear.com/7.x/shapes/svg?seed=polytechnic',
    school: 'Government Polytechnic',
    degree: 'Diploma in Computer Engineering',
    field: 'Computer Engineering',
    startDate: new Date('2021-08-01'),
    endDate: new Date('2024-08-01'),
    isCurrent: false,
    grade: '91.4%',
    description:
      'Coursework in Data Structures, Algorithms, DBMS, and Computer Networks, with hands-on programming in C, C++, Java, and Python.',
    order: 0,
  },
];

export async function seedEducation() {
  const existingCount = await Education.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await Education.insertMany(DATA);
  return { created: true, count: DATA.length };
}
