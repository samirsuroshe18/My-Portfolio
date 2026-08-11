import { Router } from 'express';
import { blogControllers, listPublicBlogs } from '../controllers/blog.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { blogSchema, blogUpdateSchema } from '../validators/blog.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const publicRouter = Router();
publicRouter.get('/', listPublicBlogs);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', blogControllers.listAdmin);
adminRouter.post('/', validate(blogSchema), blogControllers.create);
adminRouter.patch('/reorder', validate(reorderSchema), blogControllers.reorder);
adminRouter.get('/:id', blogControllers.getOne);
adminRouter.put('/:id', validate(blogUpdateSchema), blogControllers.update);
adminRouter.delete('/:id', blogControllers.remove);

export { publicRouter as blogPublicRouter, adminRouter as blogAdminRouter };
