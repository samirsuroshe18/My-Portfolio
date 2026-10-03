import { z } from 'zod';

const hackathonMemberSchema = z.object({
  name: z.string().trim().min(1).max(100),
  avatarUrl: z.string().trim().max(2000).optional().default(''),
  githubUrl: z.string().trim().max(2000).optional().default(''),
  linkedinUrl: z.string().trim().max(2000).optional().default(''),
});

export const hackathonSchema = z.object({
  title: z.string().trim().min(1).max(150),
  organizer: z.string().trim().min(1).max(150),
  date: z.coerce.date(),
  duration: z.string().trim().max(40).optional().default(''),
  image: z.string().trim().max(2000).optional().default(''),
  description: z.string().trim().min(1).max(3000),
  tags: z.array(z.string().trim()).optional().default([]),
  certificateUrl: z.string().trim().max(2000).optional().default(''),
  githubUrl: z.string().trim().max(2000).optional().default(''),
  liveUrl: z.string().trim().max(2000).optional().default(''),
  youtubeUrl: z.string().trim().max(2000).optional().default(''),
  members: z.array(hackathonMemberSchema).optional().default([]),
  sponsors: z.array(z.string().trim()).optional().default([]),
  platformPartner: z.string().trim().max(100).optional().default(''),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const hackathonUpdateSchema = hackathonSchema.partial();
