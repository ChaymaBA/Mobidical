import { z } from 'zod';
import { CategoryType } from '@/types/enum.type';

// DTO pour la création
export const CategoryCreateDto = z.object({
  name: z.nativeEnum(CategoryType, {
    errorMap: () => ({ message: 'Type de catégorie invalide' }),
  }),
});

// DTO pour la mise à jour
export const CategoryUpdateDto = z.object({
  name: z.nativeEnum(CategoryType, {
    errorMap: () => ({ message: 'Type de catégorie invalide' }),
  }).optional(),
});