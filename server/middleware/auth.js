import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { AdminUser } from '../models/AdminUser.js';
import { asyncHandler } from './asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    throw new ApiError(401, 'Authentication required');
  }

  let payload;
  try {
    payload = jwt.verify(token, env.jwtSecret);
  } catch {
    throw new ApiError(401, 'Invalid or expired session, please log in again');
  }

  const admin = await AdminUser.findById(payload.id);
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Account not found or deactivated');
  }

  req.admin = admin;
  next();
});
