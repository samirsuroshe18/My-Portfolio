import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().max(30).optional().default(''),
  subject: z.string().trim().max(150).optional().default(''),
  message: z.string().trim().min(10).max(3000),
});

export const contactStatusSchema = z.object({
  status: z.enum(['new', 'read', 'replied', 'archived']),
});
