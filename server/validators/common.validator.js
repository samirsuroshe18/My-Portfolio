import { z } from 'zod';

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  search: z.string().trim().optional(),
  sortBy: z.string().trim().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
}).catchall(z.any());

export const reorderSchema = z.array(
  z.object({
    id: z.string().min(1),
    order: z.coerce.number().int(),
  })
).min(1);

export const urlOrEmpty = z.string().trim().max(2000).optional().default('');
