import { z } from 'zod';
import { UserRole } from '@/types/enum.type';

// DTOs d'entrée pour la validation
export const FeedbackCreateDto = z.object({
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

// DTOs de réponse
export interface FeedbackBaseResponseDto {
  Id: number;
  commentaire: string;
  note: number;
}

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

export interface FeedbackUserResponseDto extends FeedbackBaseResponseDto {}

// Utility functions
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

export const transformFeedbacksToResponse = (
  feedbacks: any[], 
  userRole: UserRole
): (FeedbackAdminResponseDto | FeedbackUserResponseDto)[] => {
  return feedbacks.map(feedback => transformFeedbackToResponse(feedback, userRole));
};
