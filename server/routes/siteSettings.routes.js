import { Router } from 'express';
import { getPublicSiteSettings, getAdminSiteSettings, upsertSiteSettings } from '../controllers/siteSettings.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { siteSettingsUpdateSchema } from '../validators/siteSettings.validator.js';

const publicRouter = Router();
publicRouter.get('/', getPublicSiteSettings);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', getAdminSiteSettings);
adminRouter.put('/', validate(siteSettingsUpdateSchema), upsertSiteSettings);

export { publicRouter as siteSettingsPublicRouter, adminRouter as siteSettingsAdminRouter };
