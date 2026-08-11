import { MediumBlog } from '../models/MediumBlog.js';

const DATA = [
  {
    title: "Demystifying Android Gradle: A Developer's Guide to Smarter Builds",
    description:
      "This comprehensive guide explores how Gradle functions as Android's build automation system, explaining why Google selected it over earlier tools like Ant and Maven. The article covers essential concepts including build types, product flavors, and practical strategies for optimizing compilation speed and managing project dependencies across multiple modules.",
    coverImage: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/0*ygq24XrC3b6fG0Z5.png',
    url: 'https://medium.com/@sameersuroshe50/demystifying-android-gradle-a-developers-guide-to-smarter-builds-9d1ee453b780',
    publishedAt: new Date('2025-05-25'),
    tags: ['Android Development', 'Gradle', 'Mobile Development', 'Programming', 'Software Engineering'],
    order: 0,
  },
];

export async function seedBlogs() {
  const existingCount = await MediumBlog.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await MediumBlog.insertMany(DATA);
  return { created: true, count: DATA.length };
}
