import { Experience } from '../models/Experience.js';
import { createCrudControllers } from '../utils/crudFactory.js';

export const experienceControllers = createCrudControllers(Experience, {
  resourceName: 'Experience',
  searchableFields: ['role', 'company'],
});
