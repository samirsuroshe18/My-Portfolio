import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { seedAdminUser } from './seedAdminUser.js';
import { seedProfile } from './seedProfile.js';
import { seedSkills } from './seedSkills.js';
import { seedExperience } from './seedExperience.js';
import { seedEducation } from './seedEducation.js';
import { seedProjects } from './seedProjects.js';
import { seedOpenSource } from './seedOpenSource.js';
import { seedHackathons } from './seedHackathons.js';
import { seedSiteSettings } from './seedSiteSettings.js';
import { seedBlogs } from './seedBlogs.js';
import { seedGitHubProfile } from './seedGitHubProfile.js';

const SEEDERS = [
  ['Admin user', seedAdminUser],
  ['Profile + social links', seedProfile],
  ['Skills', seedSkills],
  ['Experience', seedExperience],
  ['Education', seedEducation],
  ['Projects', seedProjects],
  ['Open source contributions', seedOpenSource],
  ['Hackathon achievements', seedHackathons],
  ['Site settings', seedSiteSettings],
  ['Medium blogs', seedBlogs],
  ['GitHub profile', seedGitHubProfile],
];

async function run() {
  await connectDB();
  console.log('Seeding database...\n');

  for (const [label, seeder] of SEEDERS) {
    const result = await seeder();
    const status = result.created ? 'seeded' : 'already present';
    console.log(`  ✓ ${label}: ${status} (${result.detail || `${result.count} record(s)`})`);
  }

  console.log('\nSeed complete.');
  await mongoose.connection.close();
  process.exit(0);
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
