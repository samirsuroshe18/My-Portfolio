import { z } from 'zod';

export const socialLinkSchema = z.object({
  platform: z.enum(['github', 'linkedin', 'twitter', 'medium', 'mail', 'instagram', 'youtube', 'other']),
  label: z.string().trim().max(40).optional().default(''),
  url: z.string().trim().min(1).max(2000),
  icon: z.string().trim().max(200).optional().default(''),
  order: z.coerce.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const socialLinkUpdateSchema = socialLinkSchema.partial();
