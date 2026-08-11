import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { UserProfile } from '../models/UserProfile.js';
import { SocialLink } from '../models/SocialLink.js';

export const getPublicProfile = asyncHandler(async (req, res) => {
  const [profile, socialLinks] = await Promise.all([
    UserProfile.findOne({ isActive: true }),
    SocialLink.find({ isActive: true }).sort({ order: 1 }),
  ]);

  res.json(new ApiResponse(200, 'Profile', { profile, socialLinks }));
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const profile = await UserProfile.findOne();
  res.json(new ApiResponse(200, 'Profile', profile));
});

export const upsertProfile = asyncHandler(async (req, res) => {
  const profile = await UserProfile.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res.json(new ApiResponse(200, 'Profile saved', profile));
});
