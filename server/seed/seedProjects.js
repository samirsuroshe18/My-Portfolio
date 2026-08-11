import { Project } from '../models/Project.js';

const DATA = [
  {
    title: 'Visitor Management System (Gloria Connect)',
    platform: 'android',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466702/my-portfolio/gloria-connect_cl4png.png',
    description:
      'This is a Flutter mobile application built for a client with a Node.js + Express backend to simplify visitor entry management in housing societies. It provides real-time notifications, secure authentication, and role-based access for residents and security staff.\n\n' +
      '✨ Key Features:\n' +
      '🔑 Google Sign-In: Quick and secure login for users\n' +
      '🔔 Real-time Notifications: Security guards receive visitor requests instantly via FCM\n' +
      '✅ Instant Actions: Guards can approve/reject entry directly from notification buttons\n' +
      '📲 Deep Linking: Notification click opens app with a pop-up entry approval screen\n' +
      '🏠 Resident Module: Residents can send visitor entry requests with ease\n' +
      '📄 Gate Pass: Automatic generation of visitor gate passes\n' +
      '📢 Notices: Dedicated module for announcements to residents\n' +
      '🛠️ Complaints: Residents can raise and track issues efficiently\n' +
      '🔒 Secure Auth: JWT-based authentication ensures safe API communication\n\n' +
      '🛠️ Tech Stack:\n' +
      'Frontend (Mobile): Flutter (Dart)\n' +
      'Backend: Node.js + Express\n' +
      'Database: MongoDB\n' +
      'Authentication: Google Sign-In + JWT Tokens\n' +
      'Push Notifications: Firebase Cloud Messaging (FCM)\n' +
      'IDE: Android Studio / VS Code\n\n' +
      'This project was custom-built for my client to digitalize visitor entry, reduce manual processes, and improve security in housing societies.',
    tags: ['Android Studio', 'Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'flutter_bloc', 'FCM', 'Firebase'],
    techStack: ['Android Studio', 'Flutter', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'flutter_bloc', 'FCM', 'Firebase'],
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-08-01'),
    liveUrl: 'https://play.google.com/store/apps/details?id=in.smartdwelliot.gloriaconnect.gloria_connect',
    youtubeUrl: 'https://www.youtube.com/watch?v=FPaw3PvsLoE',
    order: 0,
  },
  {
    title: 'News App',
    platform: 'android',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466717/my-portfolio/newsapp_ns32jx.png',
    description:
      'The News App is an Android application built using Jetpack Compose, MVVM, and Clean Architecture. It provides users with the latest news articles in a clean, modern, and user-friendly interface. This project serves as a hands-on learning experience to explore Compose UI, modular architecture, and best practices in Android development.',
    tags: ['Android Studio', 'Jetpack Compose', 'MVVM + Clean Architecture', 'Kotlin', 'Retrofit + OkHttp', 'Hilt', 'NewsAPI'],
    techStack: ['Android Studio', 'Jetpack Compose', 'MVVM + Clean Architecture', 'Kotlin', 'Retrofit + OkHttp', 'Hilt', 'NewsAPI'],
    startDate: new Date('2025-07-01'),
    endDate: new Date('2025-08-01'),
    liveUrl: 'https://github.com/samirsuroshe18/NewsApp/releases/tag/v1.0.0',
    githubUrl: 'https://github.com/samirsuroshe18/NewsApp',
    youtubeUrl: 'https://www.youtube.com/watch?v=oaX4AnNs5pE',
    order: 1,
  },
  {
    title: 'Wellbeing',
    platform: 'android',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466724/my-portfolio/wellbeing_wsbp4g.png',
    description:
      'The Wellbeing App is an Android application designed to promote mental, creative and emotional wellbeing by encouraging users, particularly teenagers and people, to engage in positive creative activities and tasks. It was created to address the growing need for tools that support mental health and foster a sense of community and keep creative and positive. The app allows users to create tasks related to good deeds or creative, earn points (wellpoints) for completing tasks, and connect with others who share similar interests in promoting wellbeing. The project is important to us as it aims to make a positive impact on the lives of individuals and communities. It was created in Feb 2024 and is available for download on Github. To use the app, simply download .apk file from the github and install on your android device, create an account, and start completing tasks to earn wellpoints.',
    tags: ['Android Studio', 'Java', 'XML', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Volley Library', 'Postman', 'Figma'],
    techStack: ['Android Studio', 'Java', 'XML', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary', 'Volley Library', 'Postman', 'Figma'],
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-01'),
    liveUrl: 'https://github.com/samirsuroshe18/WellBeing-App/releases/tag/2.0.0',
    githubUrl: 'https://github.com/samirsuroshe18/WellBeing-app---Android-studio',
    youtubeUrl: 'https://www.youtube.com/watch?v=Eou21K7bEVM',
    order: 2,
  },
  {
    title: 'SOS Emergency App',
    platform: 'android',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466710/my-portfolio/sos_nl6a6x.png',
    description:
      "Our SOS application is designed to provide quick assistance during emergencies. It allows users to add and manage emergency contacts, customize emergency messages, access helpline numbers, and receive first aid information. The highlight of the app is the Emergency Mode feature, which, when activated, sends an SOS message along with the user's current location to registered emergency contacts. It was created in Dec 2023 and is available for download on Github. To use the app, simply download it from the github, and use it.",
    tags: ['Android Studio', 'Java', 'XML', 'Figma', 'Location'],
    techStack: ['Android Studio', 'Java', 'XML', 'Figma', 'Location'],
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-12-01'),
    liveUrl: 'https://github.com/samirsuroshe18/SOS-Emergency-App/releases/tag/2.0.0',
    githubUrl: 'https://github.com/samirsuroshe18/SOS-Emergency-App',
    youtubeUrl: 'https://www.youtube.com/watch?v=3Woo2rMs8ZU',
    order: 3,
  },
  {
    title: 'Chat App',
    platform: 'android',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466678/my-portfolio/chatapp_zutapp.png',
    description:
      'My ChatApp is a messaging application for Android devices, designed to provide users with a seamless chatting experience similar to popular messaging apps like WhatsApp. It allows users to exchange messages individually or in group chats, register and log in using their Google accounts, and manage their profiles. It was created in July 2023 and is available for download on Github. To use the app, simply download .apk file from the github and install on your android device, create an account, and start chatting.',
    tags: ['Android Studio', 'Java', 'XML', 'Google Auth', 'Firebase', 'Erasor.io', 'Figma'],
    techStack: ['Android Studio', 'Java', 'XML', 'Google Auth', 'Firebase', 'Erasor.io', 'Figma'],
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-08-01'),
    liveUrl: 'https://github.com/samirsuroshe18/My-ChatApp/releases/tag/2.0.0',
    githubUrl: 'https://github.com/samirsuroshe18/My-ChatApp',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScsVUOd-dFw',
    order: 4,
  },
  {
    title: 'InfluenceIQ (Social Media Analyzer)',
    platform: 'web',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466699/my-portfolio/influenceiq_e2ory4.png',
    description:
      'InfluenceIQ is an AI-driven social media analytics platform designed to provide deep insights into social media engagement and content strategies. By leveraging Generative AI (GenAI) technologies, the platform processes user account data and answers insightful questions about content performance, audience engagement, and strategic improvements.',
    tags: ['React Js', 'Langflow', 'Node Js', 'Gen AI', 'Express Js', 'Data stax', 'Redux', 'Chart.js'],
    techStack: ['React Js', 'Langflow', 'Node Js', 'Gen AI', 'Express Js', 'Data stax', 'Redux', 'Chart.js'],
    startDate: new Date('2024-12-01'),
    endDate: new Date('2025-01-01'),
    githubUrl: 'https://github.com/TanishqMSD/socialmedia-analyzer',
    liveUrl: 'https://influence-iq.vercel.app/',
    order: 5,
  },
  {
    title: 'Asset Management Dashboard',
    platform: 'web',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466674/my-portfolio/asset-management_um6xs1.png',
    description:
      'This is a web application built for a client using the MERN stack (MongoDB, Express, React, Node.js) to help organizations efficiently manage, track, and audit their valuable assets.\n\n' +
      '✨ Key Features:\n' +
      '📊 Dashboard View: Super Admin has a comprehensive view with complete audit logs.\n' +
      '✅ Audit Management: Approve or reject submitted audits with filters for Approved, Rejected, and Pending.\n' +
      '👥 User Management: Create and manage Admins, Auditors, and General Users with role-based access control.\n' +
      '🖼️ Asset Management: Create, update, delete assets with auto-generated QR codes.\n' +
      '📍 Location & State Tracking: Keep track of where assets are stored.\n' +
      '🔎 QR Code Scanning: Instantly view asset details by scanning QR codes.\n' +
      '📝 Audit Scheduling: Monthly and quarterly audits with proposed changes and attachments.\n' +
      '📂 Report Export: Export audit reports to Excel for easy record keeping.\n\n' +
      '🛠️ Tech Stack:\n' +
      'Frontend: React + Redux\n' +
      'Backend: Node.js + Express\n' +
      'Database: MongoDB\n' +
      'Authentication: JWT-based\n' +
      'QR Code: QR Code Generator library\n' +
      'Styling: Material UI\n' +
      'IDE: VS Code\n\n' +
      'This project was custom-built for my client to streamline asset tracking and auditing, enhancing operational efficiency and accountability.',
    tags: ['React Js', 'Redux', 'Node Js', 'Express Js', 'MongoDB', 'JWT', 'Material UI'],
    techStack: ['React Js', 'Redux', 'Node Js', 'Express Js', 'MongoDB', 'JWT', 'Material UI'],
    startDate: new Date('2025-06-01'),
    endDate: new Date('2025-08-01'),
    youtubeUrl: 'https://www.youtube.com/watch?v=MtBXKxan9HM',
    order: 6,
  },
  {
    title: 'Invoisify',
    platform: 'web',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466684/my-portfolio/invoisify_hogeg8.jpg',
    description:
      'An Invoice Generator App with robust features for businesses and freelancers. Create, manage, and export professional invoices with ease.',
    tags: ['React Js', 'Node Js', 'Express Js', 'MongoDB', 'Tailwind'],
    techStack: ['React Js', 'Node Js', 'Express Js', 'MongoDB', 'Tailwind'],
    startDate: new Date('2024-12-01'),
    endDate: new Date('2025-01-01'),
    githubUrl: 'https://github.com/TanishqMSD/invoisify',
    liveUrl: 'https://invoisify-tech.vercel.app/',
    order: 7,
  },
  {
    title: 'College Transparency System',
    platform: 'web',
    image: 'https://res.cloudinary.com/daaciwspp/image/upload/v1786466679/my-portfolio/hackfusion_ke4sv0.jpg',
    description:
      'Automated system for digital voting, facilities booking, and complaint management with real-time tracking and administrative dashboard.',
    tags: ['React Js', 'Node Js', 'Express Js', 'MongoDB', 'Tailwind', 'JWT'],
    techStack: ['React Js', 'Node Js', 'Express Js', 'MongoDB', 'Tailwind', 'JWT'],
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-07-01'),
    githubUrl: 'https://github.com/TanishqMSD/hackfusion',
    order: 8,
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
