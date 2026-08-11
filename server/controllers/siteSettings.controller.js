import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { SiteSettings } from '../models/SiteSettings.js';

export const getPublicSiteSettings = asyncHandler(async (req, res) => {
  const settings = (await SiteSettings.findOne()) || (await SiteSettings.create({}));
  res.json(new ApiResponse(200, 'Site settings', settings));
});

export const getAdminSiteSettings = asyncHandler(async (req, res) => {
  const settings = (await SiteSettings.findOne()) || (await SiteSettings.create({}));
  res.json(new ApiResponse(200, 'Site settings', settings));
});

export const upsertSiteSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });
  res.json(new ApiResponse(200, 'Site settings saved', settings));
});
