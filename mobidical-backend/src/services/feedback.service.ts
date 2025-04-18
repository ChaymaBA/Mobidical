import { FeedbackRepository } from '@/repositories/feedback.repository';
import { Feedback } from '@/entities/Feedback';
import { FeedbackCreateDtoType, FeedbackUpdateDtoType } from '@/dtos/feedback.dto';
import { UserRole } from '@/types/enum.type';

export class FeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async getAllFeedbacks(): Promise<Feedback[]> {
    return await this.feedbackRepository.findAll();
  }

  async getFeedbackById(id: number): Promise<Feedback | null> {
    return await this.feedbackRepository.findById(id);
  }

  async getFeedbacksByUser(userId: number): Promise<Feedback[]> {
    return await this.feedbackRepository.findByUserId(userId);
  }

  async createFeedback(userId: number, feedbackData: FeedbackCreateDtoType): Promise<Feedback> {
    return await this.feedbackRepository.create(userId, feedbackData);
  }

  async updateFeedback(id: number, feedbackData: FeedbackUpdateDtoType): Promise<Feedback | null> {
    return await this.feedbackRepository.update(id, feedbackData);
  }

  async deleteFeedback(id: number): Promise<boolean> {
    return await this.feedbackRepository.delete(id);
  }

  // Vérifie si un utilisateur est autorisé à accéder à un feedback
  isUserAuthorized(feedback: Feedback, userId: number, userRole: UserRole): boolean {
    // Les administrateurs ont accès à tous les feedbacks
    if (userRole === UserRole.ADMIN) {
      return true;
    }

    // Les utilisateurs normaux n'ont accès qu'à leurs propres feedbacks
    return feedback.user.id === userId;
  }
}
