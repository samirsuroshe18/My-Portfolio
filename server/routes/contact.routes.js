import { Router } from 'express';
import {
  submitContactMessage,
  listContactMessages,
  getContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} from '../controllers/contact.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';
import { validate } from '../middleware/validate.js';
import { contactMessageSchema, contactStatusSchema } from '../validators/contact.validator.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const publicRouter = Router();
publicRouter.post('/', contactRateLimiter, validate(contactMessageSchema), submitContactMessage);

const adminRouter = Router();
adminRouter.use(verifyJWT, requireRole('admin', 'superadmin'));
adminRouter.get('/', listContactMessages);
adminRouter.get('/:id', getContactMessage);
adminRouter.patch('/:id/status', validate(contactStatusSchema), updateContactMessageStatus);
adminRouter.delete('/:id', deleteContactMessage);

export { publicRouter as contactPublicRouter, adminRouter as contactAdminRouter };
