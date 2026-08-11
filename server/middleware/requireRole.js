import { ApiError } from '../utils/ApiError.js';

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.admin || !roles.includes(req.admin.role)) {
    throw new ApiError(403, 'You do not have permission to perform this action');
  }
  next();
};
