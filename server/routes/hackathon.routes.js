import { Router } from 'express';
import { hackathonControllers, getPublicHackathonById } from '../controllers/hackathon.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { hackathonSchema, hackathonUpdateSchema } from '../validators/hackathon.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', hackathonControllers.listPublic);
publicRouter.get('/:id', getPublicHackathonById);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', hackathonControllers.listAdmin);
adminRouter.post('/', validate(hackathonSchema), hackathonControllers.create);
adminRouter.patch('/reorder', validate(reorderSchema), hackathonControllers.reorder);
adminRouter.get('/:id', hackathonControllers.getOne);
adminRouter.put('/:id', validate(hackathonUpdateSchema), hackathonControllers.update);
adminRouter.delete('/:id', hackathonControllers.remove);

export { publicRouter as hackathonPublicRouter, adminRouter as hackathonAdminRouter };
