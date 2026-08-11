import { Router } from 'express';
import { openSourceControllers, getPublicOpenSourceById } from '../controllers/openSource.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { openSourceSchema, openSourceUpdateSchema } from '../validators/openSource.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', openSourceControllers.listPublic);
publicRouter.get('/:id', getPublicOpenSourceById);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', openSourceControllers.listAdmin);
adminRouter.post('/', validate(openSourceSchema), openSourceControllers.create);
adminRouter.patch('/reorder', validate(reorderSchema), openSourceControllers.reorder);
adminRouter.get('/:id', openSourceControllers.getOne);
adminRouter.put('/:id', validate(openSourceUpdateSchema), openSourceControllers.update);
adminRouter.delete('/:id', openSourceControllers.remove);

export { publicRouter as openSourcePublicRouter, adminRouter as openSourceAdminRouter };
