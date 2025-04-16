import * as zod from 'zod';
import { Difficulty } from '@/types/enum.type'; // Importation de l'énumération CategoryType et Difficulty

// DTO pour la création d’un exercice
export const ExerciceCreateDto = zod.object({
  name: zod
    .string()
    .min(3, 'Exercice name must be at least 3 characters')
    .max(100, 'Exercice name must be less than 100 characters'),

  description: zod
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),

  difficulty: zod
    .enum(Object.values(Difficulty) as [Difficulty, ...Difficulty[]], { message: 'Difficulty must be one of the valid values' }),
  pieces: zod
    .array(
      zod.object({
        imageUrl: zod.string(),
        positionX: zod.number(),
        positionY: zod.number(),
      })
    )
    .optional(),
});

// DTO pour la mise à jour d’un exercice
export const ExerciceUpdateDto = zod.object({
  name: zod
    .string()
    .min(3, 'Exercice name must be at least 3 characters')
    .max(100, 'Exercice name must be less than 100 characters')
    .optional(),

  description: zod
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),

  difficulty: zod
    .enum(Object.values(Difficulty) as [Difficulty, ...Difficulty[]], { message: 'Difficulty must be one of the valid values' })
    .optional(),

  pieces: zod
    .array(
      zod.object({
        imageUrl: zod.string(),
        positionX: zod.number(),
        positionY: zod.number(),
      })
    )
    .optional(),
});

export type ExerciceCreate = zod.infer<typeof ExerciceCreateDto>;
export type ExerciceUpdate = zod.infer<typeof ExerciceUpdateDto>;
