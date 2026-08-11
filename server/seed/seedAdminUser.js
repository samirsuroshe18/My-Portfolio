import { AdminUser } from '../models/AdminUser.js';
import { env } from '../config/env.js';

export async function seedAdminUser() {
  const existing = await AdminUser.findOne({ email: env.seed.adminEmail });
  if (existing) return { created: false, count: 1 };

  await AdminUser.create({
    name: env.seed.adminName,
    email: env.seed.adminEmail,
    password: env.seed.adminPassword,
    role: 'admin',
  });
  return { created: true, count: 1 };
}
