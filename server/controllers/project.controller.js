import mongoose from 'mongoose';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Project } from '../models/Project.js';
import { createCrudControllers } from '../utils/crudFactory.js';
import { paginate } from '../utils/paginate.js';

const base = createCrudControllers(Project, {
  resourceName: 'Project',
  searchableFields: ['title', 'tags'],
  publicFilter: { isPublished: true },
});

export const listPublicProjects = asyncHandler(async (req, res) => {
  const filter = { isPublished: true };
  if (req.query.platform) filter.platform = req.query.platform;
  if (req.query.tag) filter.tags = req.query.tag;
  if (req.query.featured === 'true') filter.isFeatured = true;

  const items = await Project.find(filter).sort({ order: 1, startDate: -1 });
  res.json(new ApiResponse(200, 'Projects', items));
});

export const listAdminProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.platform) filter.platform = req.query.platform;
  if (req.query.isPublished !== undefined) filter.isPublished = req.query.isPublished === 'true';

  const { items, meta } = await paginate(Project, req, {
    searchableFields: ['title', 'tags'],
    baseFilter: filter,
  });
  res.json(new ApiResponse(200, 'Projects', items, meta));
});

export const getProjectByIdOrSlug = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
  const project = await Project.findOne(query);

  if (!project || (!project.isPublished && !req.admin)) {
    throw new ApiError(404, 'Project not found');
  }
  res.json(new ApiResponse(200, 'Project detail', project));
});

export const { getOne: getAdminProject, create: createProject, update: updateProject, remove: removeProject, reorder: reorderProjects } = base;
