import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { OpenSourceContribution } from '../models/OpenSourceContribution.js';
import { createCrudControllers } from '../utils/crudFactory.js';

export const openSourceControllers = createCrudControllers(OpenSourceContribution, {
  resourceName: 'Open source contribution',
  searchableFields: ['title', 'projectName'],
});

export const getPublicOpenSourceById = asyncHandler(async (req, res) => {
  const item = await OpenSourceContribution.findOne({ _id: req.params.id, isActive: true });
  if (!item) throw new ApiError(404, 'Open source contribution not found');
  res.json(new ApiResponse(200, 'Open source contribution detail', item));
});
