import { Router } from 'express';
import {
  listPublicProjects,
  listAdminProjects,
  getProjectByIdOrSlug,
  getAdminProject,
  createProject,
  updateProject,
  removeProject,
  reorderProjects,
} from '../controllers/project.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { projectSchema, projectUpdateSchema } from '../validators/project.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', listPublicProjects);
publicRouter.get('/:id', getProjectByIdOrSlug);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', listAdminProjects);
adminRouter.post('/', validate(projectSchema), createProject);
adminRouter.patch('/reorder', validate(reorderSchema), reorderProjects);
adminRouter.get('/:id', getAdminProject);
adminRouter.put('/:id', validate(projectUpdateSchema), updateProject);
adminRouter.delete('/:id', removeProject);

export { publicRouter as projectPublicRouter, adminRouter as projectAdminRouter };
