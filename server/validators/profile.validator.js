import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(100),
  headline: z.string().trim().max(150).optional().default(''),
  roles: z.array(z.string().trim().min(1).max(60)).min(1),
  shortBio: z.string().trim().max(300).optional().default(''),
  description: z.string().trim().min(1).max(1000),
  avatarUrl: z.string().trim().max(2000).optional().default(''),
  location: z.string().trim().max(100).optional().default(''),
  availability: z.string().trim().max(100).optional().default(''),
  githubUrl: z.string().trim().max(2000).optional().default(''),
  linkedinUrl: z.string().trim().max(2000).optional().default(''),
  twitterUrl: z.string().trim().max(2000).optional().default(''),
  mediumUrl: z.string().trim().max(2000).optional().default(''),
  resumeUrl: z.string().trim().max(2000).optional().default(''),
  contactEmail: z.string().trim().toLowerCase().email(),
  isActive: z.boolean().optional(),
});

export const profileUpdateSchema = profileSchema.partial();
