import { Education } from '../models/Education.js';

const DATA = [
  {
    institutionLogo: 'https://gpthane.org.in/wp-content/uploads/2023/07/logo.png',
    school: 'Government Polytechnic, Thane',
    degree: 'Diploma in Computer Engineering',
    field: 'Computer Engineering',
    startDate: new Date('2021-08-01'),
    endDate: new Date('2024-08-01'),
    isCurrent: false,
    grade: '91.43%',
    description:
      'I completed a Diploma in Computer Engineering at Government Polytechnic, Thane, with an average percentage of 91.43%. My coursework included Data Structures, Algorithms, and DBMS, along with proficiency in programming languages like C, C++, Java, Python, and Android Studio, and a solid grasp of computer system fundamentals.',
    order: 0,
  },
];

export async function seedEducation() {
  const existingCount = await Education.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await Education.insertMany(DATA);
  return { created: true, count: DATA.length };
}
