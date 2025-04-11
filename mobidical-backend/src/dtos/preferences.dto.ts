// src/dtos/preference.dto.ts
import { z } from 'zod';
import { Preference } from '@/entities/Preferences';
import { UserRole, AudioSensitivity } from '@/types/enum.type';

// DTO pour la création d'une préférence
export const PreferenceCreateDto = z.object({
  child_id: z.number({
    required_error: "Child ID is required",
    invalid_type_error: "Child ID must be a number"
  }),
  preferred_colors: z.string({
    required_error: "Preferred colors is required"
  }),
  audio_sensitivity: z.nativeEnum(AudioSensitivity, {
    required_error: "Audio sensitivity is required",
    invalid_type_error: "Invalid audio sensitivity value"
  }),
  prefers_animations: z.boolean({
    required_error: "Prefers animations is required",
    invalid_type_error: "Prefers animations must be a boolean"
  }),
  visual_complexity: z.number({
    required_error: "Visual complexity is required",
    invalid_type_error: "Visual complexity must be a number"
  }).min(1, "Visual complexity must be at least 1").max(10, "Visual complexity must be at most 10"),
  favorite_activities: z.any().optional()
});

// DTO pour la mise à jour d'une préférence
export const PreferenceUpdateDto = z.object({
  preferred_colors: z.string().optional(),
  audio_sensitivity: z.nativeEnum(AudioSensitivity).optional(),
  prefers_animations: z.boolean().optional(),
  visual_complexity: z.number().min(1).max(10).optional(),
  favorite_activities: z.any().optional()
});

// Type pour les données du DTO de création
export type PreferenceCreateDtoType = z.infer<typeof PreferenceCreateDto>;

// Type pour les données du DTO de mise à jour
export type PreferenceUpdateDtoType = z.infer<typeof PreferenceUpdateDto>;

// Fonction pour transformer une préférence en réponse selon le rôle de l'utilisateur
export function transformPreferenceToResponse(preference: Preference, userRole: UserRole) {
  const baseResponse = {
    id: preference.id,
    child_id: preference.child_id,
    preferred_colors: preference.preferred_colors,
    audio_sensitivity: preference.audio_sensitivity,
    prefers_animations: preference.prefers_animations,
    visual_complexity: preference.visual_complexity,
    favorite_activities: preference.favorite_activities,
    updated_at: preference.updated_at
  };

  // Les admins peuvent voir des informations supplémentaires si nécessaire
  if (userRole === UserRole.ADMIN) {
    return {
      ...baseResponse,
      // Ajouter d'autres informations pertinentes pour les admins si nécessaire
      child: preference.child ? {
        id: preference.child.id,
        first_name: preference.child.first_name,
        // Autres informations sur l'enfant
      } : null
    };
  }

  return baseResponse;
}

// Fonction pour transformer une liste de préférences en réponse selon le rôle de l'utilisateur
export function transformPreferencesToResponse(preferences: Preference[], userRole: UserRole) {
  return preferences.map(preference => transformPreferenceToResponse(preference, userRole));
}