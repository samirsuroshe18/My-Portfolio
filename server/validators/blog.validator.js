import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(500).optional().default(''),
  coverImage: z.string().trim().max(2000).optional().default(''),
  url: z.string().trim().min(1),
  publishedAt: z.coerce.date(),
  tags: z.array(z.string().trim()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const blogUpdateSchema = blogSchema.partial();
