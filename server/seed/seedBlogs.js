import { MediumBlog } from '../models/MediumBlog.js';

const DATA = [
  {
    title: 'Understanding Flutter State Management',
    description: 'A practical comparison of Provider, Riverpod, and Bloc for real-world Flutter apps.',
    coverImage: 'https://picsum.photos/seed/flutter-state/800/450',
    url: 'https://medium.com/@aaravmehta.dev/understanding-flutter-state-management',
    publishedAt: new Date('2025-08-01'),
    tags: ['Flutter', 'Mobile Development'],
    isFeatured: true,
    order: 0,
  },
  {
    title: 'Designing REST APIs That Don’t Fall Apart',
    description: 'Lessons learned building and versioning REST APIs for production MERN apps.',
    coverImage: 'https://picsum.photos/seed/rest-apis/800/450',
    url: 'https://medium.com/@aaravmehta.dev/designing-rest-apis',
    publishedAt: new Date('2025-06-12'),
    tags: ['Backend', 'API Design'],
    order: 1,
  },
  {
    title: 'From Idea to Play Store: Shipping a Flutter App Solo',
    description: 'A behind-the-scenes look at shipping a visitor management app end-to-end.',
    coverImage: 'https://picsum.photos/seed/play-store/800/450',
    url: 'https://medium.com/@aaravmehta.dev/idea-to-play-store',
    publishedAt: new Date('2025-03-22'),
    tags: ['Flutter', 'Product'],
    order: 2,
  },
];

export async function seedBlogs() {
  const existingCount = await MediumBlog.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  await MediumBlog.insertMany(DATA);
  return { created: true, count: DATA.length };
}
