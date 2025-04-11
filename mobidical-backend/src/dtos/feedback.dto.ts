// src/dtos/feedback.dto.ts
import { z } from 'zod';
import { UserRole } from '@/types/enum.type';

// DTOs d'entrée pour la validation
export const FeedbackCreateDto = z.object({
  userId: z.number().int().positive(),
  commentaire: z.string().min(3).max(1000),
  note: z.number().int().min(1).max(5)
});

export const FeedbackUpdateDto = z.object({
  commentaire: z.string().min(3).max(1000).optional(),
  note: z.number().int().min(1).max(5).optional()
});

// Types TypeScript pour les DTOs d'entrée
export type FeedbackCreateDtoType = z.infer<typeof FeedbackCreateDto>;
export type FeedbackUpdateDtoType = z.infer<typeof FeedbackUpdateDto>;

// DTOs de réponse pour présenter différentes informations selon le rôle
export interface FeedbackBaseResponseDto {
  Id: number;
  commentaire: string;
  note: number;
}

// DTO de réponse pour les administrateurs (informations complètes)
export interface FeedbackAdminResponseDto extends FeedbackBaseResponseDto {
  user: {
    id: number;
    username: string;
    lastName: string;
    email: string;
    role: string;
  };
  created_at?: Date;
}

// DTO de réponse pour les utilisateurs standards (informations limitées)
export interface FeedbackUserResponseDto extends FeedbackBaseResponseDto {
  // Les utilisateurs standards ne voient que les informations basiques
}

// Fonction utilitaire pour transformer un feedback en DTO de réponse approprié
export const transformFeedbackToResponse = (
  feedback: any, 
  userRole: UserRole
): FeedbackAdminResponseDto | FeedbackUserResponseDto => {
  if (userRole === UserRole.ADMIN) {
    return {
      Id: feedback.Id,
      commentaire: feedback.commentaire,
      note: feedback.note,
      user: {
        id: feedback.user.id,
        username: feedback.user.username,
        lastName: feedback.user.lastName,
        email: feedback.user.email,
        role: feedback.user.role
      },
      created_at: feedback.created_at
    };
  } else {
    return {
      Id: feedback.Id,
      commentaire: feedback.commentaire,
      note: feedback.note
    };
  }
};

// Fonction pour transformer un tableau de feedbacks
export const transformFeedbacksToResponse = (
  feedbacks: any[], 
  userRole: UserRole
): (FeedbackAdminResponseDto | FeedbackUserResponseDto)[] => {
  return feedbacks.map(feedback => transformFeedbackToResponse(feedback, userRole));
};