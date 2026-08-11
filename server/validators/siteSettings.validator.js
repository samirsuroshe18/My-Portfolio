import { z } from 'zod';

const navItemSchema = z.object({
  label: z.string().trim().min(1).max(40),
  href: z.string().trim().min(1).max(80),
  order: z.coerce.number().int().optional().default(0),
});

export const siteSettingsSchema = z.object({
  logoText: z.string().trim().min(1).max(60),
  logoUrl: z.string().trim().max(2000).optional().default(''),
  navItems: z.array(navItemSchema).optional().default([]),
  footerText: z.string().trim().max(200).optional().default(''),
  accentColor: z.string().trim().regex(/^#([0-9A-Fa-f]{3}){1,2}$/).optional().default('#854CE6'),
  showGithubButton: z.boolean().optional().default(true),
  metaTitle: z.string().trim().max(100).optional().default(''),
  metaDescription: z.string().trim().max(300).optional().default(''),
  maintenanceMode: z.boolean().optional().default(false),
});

export const siteSettingsUpdateSchema = siteSettingsSchema.partial();
