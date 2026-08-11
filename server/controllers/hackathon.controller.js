import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HackathonAchievement } from '../models/HackathonAchievement.js';
import { createCrudControllers } from '../utils/crudFactory.js';

export const hackathonControllers = createCrudControllers(HackathonAchievement, {
  resourceName: 'Hackathon achievement',
  searchableFields: ['title', 'organizer'],
});

export const getPublicHackathonById = asyncHandler(async (req, res) => {
  const item = await HackathonAchievement.findOne({ _id: req.params.id, isActive: true });
  if (!item) throw new ApiError(404, 'Hackathon achievement not found');
  res.json(new ApiResponse(200, 'Hackathon achievement detail', item));
});
