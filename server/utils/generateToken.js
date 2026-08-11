import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateToken(adminUser) {
  return jwt.sign(
    { id: adminUser._id.toString(), role: adminUser.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}
