import { Router } from 'express';
import { login, me, logout, changePassword } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, changePasswordSchema } from '../validators/auth.validator.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', loginRateLimiter, validate(loginSchema), login);
router.get('/me', verifyJWT, me);
router.post('/logout', verifyJWT, logout);
router.post('/change-password', verifyJWT, validate(changePasswordSchema), changePassword);

export default router;
