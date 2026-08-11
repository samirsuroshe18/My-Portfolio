import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { MediumBlog } from '../models/MediumBlog.js';
import { createCrudControllers } from '../utils/crudFactory.js';

const base = createCrudControllers(MediumBlog, {
  resourceName: 'Blog post',
  searchableFields: ['title', 'tags'],
});

export const listPublicBlogs = asyncHandler(async (req, res) => {
  const items = await MediumBlog.find({ isActive: true }).sort({ publishedAt: -1 });
  res.json(new ApiResponse(200, 'Blog posts', items));
});

export const blogControllers = base;
