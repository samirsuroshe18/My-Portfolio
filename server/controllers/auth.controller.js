import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { generateToken } from '../utils/generateToken.js';
import { AdminUser } from '../models/AdminUser.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminUser.findOne({ email }).select('+password');
  if (!admin || !admin.isActive) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  admin.lastLoginAt = new Date();
  await admin.save();

  const token = generateToken(admin);

  res.json(
    new ApiResponse(200, 'Login successful', {
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    })
  );
});

export const me = asyncHandler(async (req, res) => {
  res.json(
    new ApiResponse(200, 'Current admin', {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
    })
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, 'Logged out'));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await AdminUser.findById(req.admin._id).select('+password');

  const isMatch = await admin.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  admin.password = newPassword;
  await admin.save();

  res.json(new ApiResponse(200, 'Password changed successfully'));
});
