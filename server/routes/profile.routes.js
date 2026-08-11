import { Router } from 'express';
import { getPublicProfile, getAdminProfile, upsertProfile } from '../controllers/profile.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { profileUpdateSchema } from '../validators/profile.validator.js';

const router = Router();

router.get('/', getPublicProfile);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', getAdminProfile);
adminRouter.put('/', validate(profileUpdateSchema), upsertProfile);

export { router as profileRouter, adminRouter as adminProfileRouter };
