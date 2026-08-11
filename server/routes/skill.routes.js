import { Router } from 'express';
import {
  skillCategoryControllers,
  removeSkillCategory,
  skillControllers,
  getPublicSkills,
} from '../controllers/skill.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { skillCategorySchema, skillCategoryUpdateSchema, skillSchema, skillUpdateSchema } from '../validators/skill.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', getPublicSkills);

const adminCategoryRouter = Router();
adminCategoryRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminCategoryRouter.get('/', skillCategoryControllers.listAdmin);
adminCategoryRouter.post('/', validate(skillCategorySchema), skillCategoryControllers.create);
adminCategoryRouter.patch('/reorder', validate(reorderSchema), skillCategoryControllers.reorder);
adminCategoryRouter.get('/:id', skillCategoryControllers.getOne);
adminCategoryRouter.put('/:id', validate(skillCategoryUpdateSchema), skillCategoryControllers.update);
adminCategoryRouter.delete('/:id', removeSkillCategory);

const adminSkillRouter = Router();
adminSkillRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminSkillRouter.get('/', skillControllers.listAdmin);
adminSkillRouter.post('/', validate(skillSchema), skillControllers.create);
adminSkillRouter.patch('/reorder', validate(reorderSchema), skillControllers.reorder);
adminSkillRouter.get('/:id', skillControllers.getOne);
adminSkillRouter.put('/:id', validate(skillUpdateSchema), skillControllers.update);
adminSkillRouter.delete('/:id', skillControllers.remove);

export { publicRouter as skillPublicRouter, adminCategoryRouter, adminSkillRouter };
