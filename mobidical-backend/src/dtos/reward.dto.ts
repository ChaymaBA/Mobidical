// src/dtos/reward.dto.ts
import { z } from 'zod';

export const RewardCreateDto = z.object({
  nom: z.string().min(1, { message: 'Le nom est obligatoire' }),
  pointsNecessaires: z.number().int().positive({ message: 'Les points nécessaires doivent être un nombre positif' })
});

export const RewardUpdateDto = z.object({
  nom: z.string().min(1, { message: 'Le nom est obligatoire' }).optional(),
  pointsNecessaires: z.number().int().positive({ message: 'Les points nécessaires doivent être un nombre positif' }).optional()
});

export type RewardCreateDtoType = z.infer<typeof RewardCreateDto>;
export type RewardUpdateDtoType = z.infer<typeof RewardUpdateDto>;
