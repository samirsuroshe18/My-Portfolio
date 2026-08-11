import { Router } from 'express';
import { socialLinkControllers } from '../controllers/socialLink.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { socialLinkSchema, socialLinkUpdateSchema } from '../validators/socialLink.validator.js';
import { reorderSchema } from '../validators/common.validator.js';

const router = Router();
router.use(verifyJWT, requireRole('admin', 'superadmin'));

router.get('/', socialLinkControllers.listAdmin);
router.post('/', validate(socialLinkSchema), socialLinkControllers.create);
router.patch('/reorder', validate(reorderSchema), socialLinkControllers.reorder);
router.get('/:id', socialLinkControllers.getOne);
router.put('/:id', validate(socialLinkUpdateSchema), socialLinkControllers.update);
router.delete('/:id', socialLinkControllers.remove);

export default router;
