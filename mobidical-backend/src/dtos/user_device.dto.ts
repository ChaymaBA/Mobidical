import { z } from 'zod';

export const UserDeviceCreateDto = z.object({
  device_token: z.string().min(1).optional(),
  device_type: z.enum(['ios', 'android','web']),
  is_active: z.boolean().optional(),
  last_used_at: z.coerce.date().optional()
});

export const UserDeviceUpdateDto = z.object({
  device_token: z.string().min(1).optional(),
  device_type: z.enum(['ios', 'android','web']).optional(),
  is_active: z.boolean().optional(),
  last_used_at: z.coerce.date().optional()
});
