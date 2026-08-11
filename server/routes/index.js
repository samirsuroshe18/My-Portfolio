import { Router } from 'express';

import { profileRouter, adminProfileRouter } from './profile.routes.js';
import socialLinkAdminRouter from './socialLink.routes.js';
import { skillPublicRouter, adminCategoryRouter, adminSkillRouter } from './skill.routes.js';
import { experiencePublicRouter, experienceAdminRouter } from './experience.routes.js';
import { educationPublicRouter, educationAdminRouter } from './education.routes.js';
import { projectPublicRouter, projectAdminRouter } from './project.routes.js';
import { openSourcePublicRouter, openSourceAdminRouter } from './openSource.routes.js';
import { hackathonPublicRouter, hackathonAdminRouter } from './hackathon.routes.js';
import { blogPublicRouter, blogAdminRouter } from './blog.routes.js';
import { contactPublicRouter, contactAdminRouter } from './contact.routes.js';
import { siteSettingsPublicRouter, siteSettingsAdminRouter } from './siteSettings.routes.js';
import { githubPublicRouter, githubAdminRouter } from './github.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

// Public
router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/skills', skillPublicRouter);
router.use('/experience', experiencePublicRouter);
router.use('/education', educationPublicRouter);
router.use('/projects', projectPublicRouter);
router.use('/open-source', openSourcePublicRouter);
router.use('/hackathons', hackathonPublicRouter);
router.use('/blogs', blogPublicRouter);
router.use('/github', githubPublicRouter);
router.use('/contact', contactPublicRouter);
router.use('/site-settings', siteSettingsPublicRouter);

// Admin (all protected inside their own router)
router.use('/admin/profile', adminProfileRouter);
router.use('/admin/social-links', socialLinkAdminRouter);
router.use('/admin/skill-categories', adminCategoryRouter);
router.use('/admin/skills', adminSkillRouter);
router.use('/admin/experience', experienceAdminRouter);
router.use('/admin/education', educationAdminRouter);
router.use('/admin/projects', projectAdminRouter);
router.use('/admin/open-source', openSourceAdminRouter);
router.use('/admin/hackathons', hackathonAdminRouter);
router.use('/admin/blogs', blogAdminRouter);
router.use('/admin/contact', contactAdminRouter);
router.use('/admin/site-settings', siteSettingsAdminRouter);
router.use('/admin/github', githubAdminRouter);

export default router;
