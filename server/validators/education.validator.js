import { z } from 'zod';

export const educationSchema = z.object({
  institutionLogo: z.string().trim().max(2000).optional().default(''),
  school: z.string().trim().min(1).max(150),
  degree: z.string().trim().min(1).max(150),
  field: z.string().trim().max(150).optional().default(''),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  isCurrent: z.boolean().optional().default(false),
  grade: z.string().trim().max(20).optional().default(''),
  description: z.string().trim().max(2000).optional().default(''),
  certificateUrl: z.string().trim().max(2000).optional().default(''),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const educationUpdateSchema = educationSchema.partial();
