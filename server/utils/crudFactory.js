import { ApiError } from './ApiError.js';
import { ApiResponse } from './ApiResponse.js';
import { paginate } from './paginate.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

/**
 * Generates standard list/create/getOne/update/remove/reorder controllers for a
 * simple (non-singleton) Mongoose resource. Resource-specific controllers
 * compose these with any extra logic they need instead of duplicating CRUD boilerplate.
 */
export function createCrudControllers(Model, { resourceName, searchableFields = [], publicFilter = { isActive: true } }) {
  const listAdmin = asyncHandler(async (req, res) => {
    const { items, meta } = await paginate(Model, req, { searchableFields });
    res.json(new ApiResponse(200, `${resourceName} list`, items, meta));
  });

  const listPublic = asyncHandler(async (req, res) => {
    const items = await Model.find(publicFilter).sort({ order: 1, createdAt: -1 });
    res.json(new ApiResponse(200, `${resourceName} list`, items));
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) throw new ApiError(404, `${resourceName} not found`);
    res.json(new ApiResponse(200, `${resourceName} detail`, item));
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(new ApiResponse(201, `${resourceName} created`, item));
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new ApiError(404, `${resourceName} not found`);
    res.json(new ApiResponse(200, `${resourceName} updated`, item));
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, `${resourceName} not found`);
    res.json(new ApiResponse(200, `${resourceName} deleted`, item));
  });

  const reorder = asyncHandler(async (req, res) => {
    await Promise.all(
      req.body.map(({ id, order }) => Model.findByIdAndUpdate(id, { order }))
    );
    res.json(new ApiResponse(200, `${resourceName} reordered`));
  });

  return { listAdmin, listPublic, getOne, create, update, remove, reorder };
}
