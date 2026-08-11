import { Project } from '../models/Project.js';

const DATA = [
  {
    title: 'Society Visitor Management System',
    platform: 'android',
    image: 'https://picsum.photos/seed/visitor-mgmt/800/500',
    shortDescription: 'Real-time visitor approvals for gated communities.',
    description:
      'A Flutter mobile app with a Node.js + Express backend that streamlines visitor entry for housing societies. Security guards get instant push notifications for visitor requests and can approve or reject entries directly from the notification. Residents can raise gate passes, post notices, and track complaints.\n\nKey features: Google Sign-In, FCM push notifications, deep-linking to an approval screen, JWT-secured APIs, and a resident complaints module.',
    tags: ['Flutter', 'Node.js', 'Express.js', 'MongoDB', 'FCM', 'Firebase'],
    techStack: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Cloud Messaging'],
    highlights: ['100+ daily active users', 'Sub-2-second push notification delivery'],
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-08-01'),
    liveUrl: 'https://play.google.com/store/apps/details?id=com.example.visitormgmt',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    isFeatured: true,
    order: 0,
  },
  {
    title: 'Pulse News',
    platform: 'android',
    image: 'https://picsum.photos/seed/pulse-news/800/500',
    shortDescription: 'A modern news reader built with Jetpack Compose.',
    description:
      'An Android news application built with Jetpack Compose, MVVM, and Clean Architecture, fetching live articles from a public news API with offline caching support.',
    tags: ['Jetpack Compose', 'Kotlin', 'MVVM', 'Retrofit', 'Hilt'],
    techStack: ['Kotlin', 'Jetpack Compose', 'Retrofit', 'OkHttp', 'Hilt'],
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-08-15'),
    githubUrl: 'https://github.com/aaravmehta-dev/pulse-news',
    order: 1,
  },
  {
    title: 'InsightBoard Analytics',
    platform: 'web',
    image: 'https://picsum.photos/seed/insightboard/800/500',
    shortDescription: 'AI-assisted social media analytics dashboard.',
    description:
      'An AI-driven analytics platform that answers natural-language questions about social content performance, using a GenAI pipeline to summarize engagement trends and suggest strategy improvements.',
    tags: ['React', 'Node.js', 'Express.js', 'GenAI', 'Redux', 'Chart.js'],
    techStack: ['React', 'Redux', 'Node.js', 'Express.js', 'Chart.js'],
    highlights: ['Processes 10k+ posts per analysis run'],
    startDate: new Date('2024-12-01'),
    endDate: new Date('2025-01-20'),
    githubUrl: 'https://github.com/aaravmehta-dev/insightboard',
    liveUrl: 'https://insightboard.example.com',
    isFeatured: true,
    order: 2,
  },
  {
    title: 'Invoicely',
    platform: 'web',
    image: 'https://picsum.photos/seed/invoicely/800/500',
    shortDescription: 'Invoice generator for freelancers and small teams.',
    description:
      'A full-featured invoice generator with client management, line-item builder, PDF export, and payment status tracking, built for freelancers and small agencies.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind'],
    techStack: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-30'),
    githubUrl: 'https://github.com/aaravmehta-dev/invoicely',
    liveUrl: 'https://invoicely.example.com',
    order: 3,
  },
  {
    title: 'CampusVoice',
    platform: 'web',
    image: 'https://picsum.photos/seed/campusvoice/800/500',
    shortDescription: 'Transparent digital voting & complaints portal for colleges.',
    description:
      'A campus governance portal supporting digital voting for student elections, facility booking, and complaint tracking with a real-time administrative dashboard.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-07-01'),
    githubUrl: 'https://github.com/aaravmehta-dev/campusvoice',
    order: 4,
  },
];

export async function seedProjects() {
  const existingCount = await Project.countDocuments();
  if (existingCount > 0) return { created: false, count: existingCount };

  for (const data of DATA) {
    await Project.create(data);
  }
  return { created: true, count: DATA.length };
}
