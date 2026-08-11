import { z } from 'zod';

const memberSchema = z.object({
  name: z.string().trim().min(1).max(100),
  avatarUrl: z.string().trim().max(2000).optional().default(''),
});

export const openSourceSchema = z.object({
  title: z.string().trim().min(1).max(150),
  projectName: z.string().trim().min(1).max(100),
  repositoryUrl: z.string().trim().min(1),
  pullRequestUrl: z.string().trim().min(1),
  image: z.string().trim().max(2000).optional().default(''),
  description: z.string().trim().min(1).max(3000),
  technologies: z.array(z.string().trim()).optional().default([]),
  tags: z.array(z.string().trim()).optional().default([]),
  status: z.enum(['Open', 'Merged', 'Closed']).optional().default('Open'),
  release: z.string().trim().max(60).optional().default(''),
  date: z.coerce.date(),
  members: z.array(memberSchema).optional().default([]),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const openSourceUpdateSchema = openSourceSchema.partial();
