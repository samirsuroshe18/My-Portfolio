import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(150),
  platform: z.enum(['web', 'android', 'ios', 'desktop']),
  image: z.string().trim().min(1),
  gallery: z.array(z.string().trim()).optional().default([]),
  shortDescription: z.string().trim().max(300).optional().default(''),
  description: z.string().trim().min(1).max(5000),
  tags: z.array(z.string().trim()).optional().default([]),
  techStack: z.array(z.string().trim()).optional().default([]),
  highlights: z.array(z.string().trim()).optional().default([]),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  youtubeUrl: z.string().trim().max(2000).optional().default(''),
  liveUrl: z.string().trim().max(2000).optional().default(''),
  githubUrl: z.string().trim().max(2000).optional().default(''),
  status: z.enum(['completed', 'in-progress', 'archived']).optional().default('completed'),
  isFeatured: z.boolean().optional().default(false),
  order: z.coerce.number().int().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

export const projectUpdateSchema = projectSchema.partial();
