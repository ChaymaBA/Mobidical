// src/dtos/user-session.dto.ts

import { z } from 'zod';
import { DeviceInfo, Location } from '@/types';

export const UserSessionCreateDto = z.object({
  deviceType: z.enum(['mobile', 'tablet', 'desktop', 'other']),
  deviceInfo: z.object({}),
  ipAddress: z.string().optional(),
  token: z.string().optional(),
  location: z.object({}).optional()
});

export const UserSessionUpdateDto = z.object({
  isActive: z.boolean().optional(),
  lastActivityAt: z.date().optional(),
  refreshToken: z.string().optional()
});

export const RefreshTokenDto = z.object({
  refreshToken: z.string()
});

export type UserSessionCreateDtoType = z.infer<typeof UserSessionCreateDto>;
export type UserSessionUpdateDtoType = z.infer<typeof UserSessionUpdateDto>;
export type RefreshTokenDtoType = z.infer<typeof RefreshTokenDto>;

export interface LoginResponseDto {
  token: string;
  refreshToken: string;
  expiresAt: Date;
  user: {
    id: number;
    email: string;
    // Autres propriétés utilisateur si nécessaire
  };
}