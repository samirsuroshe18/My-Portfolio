import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';

const SEEDERS = {
  admin: () => import('./seedAdminUser.js').then((m) => m.seedAdminUser()),
  profile: () => import('./seedProfile.js').then((m) => m.seedProfile()),
  skills: () => import('./seedSkills.js').then((m) => m.seedSkills()),
  experience: () => import('./seedExperience.js').then((m) => m.seedExperience()),
  education: () => import('./seedEducation.js').then((m) => m.seedEducation()),
  projects: () => import('./seedProjects.js').then((m) => m.seedProjects()),
  openSource: () => import('./seedOpenSource.js').then((m) => m.seedOpenSource()),
  hackathons: () => import('./seedHackathons.js').then((m) => m.seedHackathons()),
  siteSettings: () => import('./seedSiteSettings.js').then((m) => m.seedSiteSettings()),
  blogs: () => import('./seedBlogs.js').then((m) => m.seedBlogs()),
  github: () => import('./seedGitHubProfile.js').then((m) => m.seedGitHubProfile()),
};

const name = process.argv[2];
if (!SEEDERS[name]) {
  console.error(`Unknown seeder "${name}". Options: ${Object.keys(SEEDERS).join(', ')}`);
  process.exit(1);
}

async function run() {
  await connectDB();
  const result = await SEEDERS[name]();
  console.log(`${name}:`, result);
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error(`Seed "${name}" failed:`, err);
  process.exit(1);
});
