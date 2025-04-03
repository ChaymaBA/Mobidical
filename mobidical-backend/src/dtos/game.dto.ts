import * as zod from 'zod';
import { DIFFICULTY_REGEX} from '@/constants/regex.constants';
// DTO pour la création d'un jeu
export const GameCreateDto = zod.object({
  name: zod
    .string()
    .min(3, 'Game name must be at least 3 characters')
    .max(100, 'Game name must be less than 100 characters'),

  difficulty: zod
    .string()
    .min(3, 'Difficulty level must be at least 3 characters')
    .max(50, 'Difficulty level must be less than 50 characters')
    .regex(DIFFICULTY_REGEX, 'Difficulty must be one of the following: easy, medium, or hard'),

  category: zod
    .string()
    .min(3, 'Category must be at least 3 characters')
    .max(50, 'Category must be less than 50 characters'),
  
  description: zod
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),  // La description est optionnelle

  userId: zod.number().min(1, 'User ID must be a valid number'), // L'ID de l'utilisateur associé
  progressionId: zod.number().min(1, 'Progression ID must be a valid number'), // L'ID de la progression associée
  pieces: zod
    .array(
      zod.object({
        imageUrl: zod.string(),
        positionX: zod.number(),
        positionY: zod.number(),
      })
    )
    .optional(), // Les pièces sont optionnelles

});

// DTO pour la mise à jour d'un jeu
export const GameUpdateDto = zod.object({
  name: zod
    .string()
    .min(3, 'Game name must be at least 3 characters')
    .max(100, 'Game name must be less than 100 characters')
    .optional(),

  difficulty: zod
    .string()
    .min(3, 'Difficulty level must be at least 3 characters')
    .max(50, 'Difficulty level must be less than 50 characters')
    .regex(DIFFICULTY_REGEX, 'Difficulty must be one of the following: easy, medium, or hard')
    .optional(),

  category: zod
    .string()
    .min(3, 'Category must be at least 3 characters')
    .max(50, 'Category must be less than 50 characters')
    .optional(),

  description: zod
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
});

export type GameCreate = zod.infer<typeof GameCreateDto>;
export type GameUpdate = zod.infer<typeof GameUpdateDto>;
