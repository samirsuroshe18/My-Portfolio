import { Router } from 'express';
import { getPublicGithub, getAdminGithubConfig, updateGithubConfig } from '../controllers/github.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { githubConfigSchema } from '../validators/github.validator.js';

const publicRouter = Router();
publicRouter.get('/', getPublicGithub);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/config', getAdminGithubConfig);
adminRouter.put('/config', validate(githubConfigSchema), updateGithubConfig);

export { publicRouter as githubPublicRouter, adminRouter as githubAdminRouter };
