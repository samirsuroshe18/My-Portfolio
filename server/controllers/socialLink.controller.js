import { SocialLink } from '../models/SocialLink.js';
import { createCrudControllers } from '../utils/crudFactory.js';

export const socialLinkControllers = createCrudControllers(SocialLink, {
  resourceName: 'Social link',
  searchableFields: ['label', 'platform'],
});
