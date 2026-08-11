import { asyncHandler } from '../middleware/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { SkillCategory } from '../models/SkillCategory.js';
import { Skill } from '../models/Skill.js';
import { createCrudControllers } from '../utils/crudFactory.js';

export const skillCategoryControllers = createCrudControllers(SkillCategory, {
  resourceName: 'Skill category',
  searchableFields: ['title'],
});

// Deleting a category is blocked if skills still reference it, to avoid orphaned skills.
export const removeSkillCategory = asyncHandler(async (req, res) => {
  const inUse = await Skill.exists({ category: req.params.id });
  if (inUse) {
    throw new ApiError(409, 'Cannot delete a category that still has skills. Move or delete its skills first.');
  }
  const category = await SkillCategory.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Skill category not found');
  res.json(new ApiResponse(200, 'Skill category deleted', category));
});

export const skillControllers = createCrudControllers(Skill, {
  resourceName: 'Skill',
  searchableFields: ['name'],
});

export const getPublicSkills = asyncHandler(async (req, res) => {
  const categories = await SkillCategory.find({ isActive: true }).sort({ order: 1 });
  const skills = await Skill.find({ isActive: true }).sort({ order: 1 });

  const grouped = categories.map((category) => ({
    _id: category._id,
    title: category.title,
    order: category.order,
    skills: skills.filter((skill) => skill.category.toString() === category._id.toString()),
  }));

  res.json(new ApiResponse(200, 'Skills', grouped));
});
