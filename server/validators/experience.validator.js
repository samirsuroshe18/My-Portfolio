import { z } from 'zod';

export const experienceSchema = z.object({
  companyLogo: z.string().trim().max(2000).optional().default(''),
  role: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(100),
  location: z.string().trim().max(100).optional().default(''),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  isCurrent: z.boolean().optional().default(false),
  description: z.string().trim().min(1).max(2000),
  bulletPoints: z.array(z.string().trim()).optional().default([]),
  technologies: z.array(z.string().trim()).optional().default([]),
  achievements: z.array(z.string().trim()).optional().default([]),
  certificateUrl: z.string().trim().max(2000).optional().default(''),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const experienceUpdateSchema = experienceSchema.partial();
