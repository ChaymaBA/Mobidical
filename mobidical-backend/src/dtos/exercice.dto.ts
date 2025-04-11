import * as zod from 'zod';

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

  userId: zod.number().min(1, 'User ID must be a valid number'),
  progressReportId: zod.number().min(1, 'Progression ID must be a valid number'),
  

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
    .optional()
});

export type ExerciceCreate = zod.infer<typeof ExerciceCreateDto>;
export type ExerciceUpdate = zod.infer<typeof ExerciceUpdateDto>;
