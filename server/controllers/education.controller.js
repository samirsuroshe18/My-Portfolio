import { Education } from '../models/Education.js';
import { createCrudControllers } from '../utils/crudFactory.js';

export const educationControllers = createCrudControllers(Education, {
  resourceName: 'Education',
  searchableFields: ['school', 'degree'],
});
