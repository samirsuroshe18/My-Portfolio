import { Router } from 'express';
import { educationControllers } from '../controllers/education.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { educationSchema, educationUpdateSchema } from '../validators/education.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', educationControllers.listPublic);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', educationControllers.listAdmin);
adminRouter.post('/', validate(educationSchema), educationControllers.create);
adminRouter.patch('/reorder', validate(reorderSchema), educationControllers.reorder);
adminRouter.get('/:id', educationControllers.getOne);
adminRouter.put('/:id', validate(educationUpdateSchema), educationControllers.update);
adminRouter.delete('/:id', educationControllers.remove);

export { publicRouter as educationPublicRouter, adminRouter as educationAdminRouter };
