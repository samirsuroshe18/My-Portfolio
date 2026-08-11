import { z } from 'zod';

export const skillCategorySchema = z.object({
  title: z.string().trim().min(1).max(60),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});
export const skillCategoryUpdateSchema = skillCategorySchema.partial();

export const skillSchema = z.object({
  category: z.string().trim().min(1),
  name: z.string().trim().min(1).max(60),
  icon: z.string().trim().min(1),
  proficiency: z.coerce.number().min(0).max(100).optional().default(80),
  isFeatured: z.boolean().optional().default(false),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});
export const skillUpdateSchema = skillSchema.partial();
