import { Router } from 'express';
import { experienceControllers } from '../controllers/experience.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { experienceSchema, experienceUpdateSchema } from '../validators/experience.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', experienceControllers.listPublic);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', experienceControllers.listAdmin);
adminRouter.post('/', validate(experienceSchema), experienceControllers.create);
adminRouter.patch('/reorder', validate(reorderSchema), experienceControllers.reorder);
adminRouter.get('/:id', experienceControllers.getOne);
adminRouter.put('/:id', validate(experienceUpdateSchema), experienceControllers.update);
adminRouter.delete('/:id', experienceControllers.remove);

export { publicRouter as experiencePublicRouter, adminRouter as experienceAdminRouter };
