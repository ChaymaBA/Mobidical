import { z } from 'zod';

export const SessionCreateDto = z.object({
  started_at: z.string().datetime(),
  ended_at: z.string().datetime(),
  device_info: z.record(z.any()).optional(),
  notes: z.string().optional(),
});

export const SessionUpdateDto = z.object({
  started_at: z.string().datetime().optional(),
  ended_at: z.string().datetime().optional(),
  device_info: z.record(z.any()).optional(),
  notes: z.string().optional(),
});
