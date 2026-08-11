import { z } from 'zod';

export const githubConfigSchema = z.object({
  username: z.string().trim().regex(/^[a-zA-Z0-9-]{0,39}$/).optional().default(''),
  displayContributionGraph: z.boolean().optional().default(true),
});
