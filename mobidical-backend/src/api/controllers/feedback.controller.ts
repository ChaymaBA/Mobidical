// src/api/controllers/feedback.controller.ts
import { Request, Response } from 'express';
import { FeedbackService } from '@/services/feedback.service';
import { handleError } from '@/core/errors/errorHandler';
import { 
  FeedbackCreateDto, 
  FeedbackUpdateDto, 
  transformFeedbackToResponse, 
  transformFeedbacksToResponse 
} from '@/dtos/feedback.dto';
import { UserRole } from '@/types/enum.type';

export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  async createFeedback(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = FeedbackCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      // Vérifier que l'utilisateur crée un feedback pour lui-même
      // sauf s'il est admin
      const feedbackData = validationResult.data;
      if (req.user?.role !== UserRole.ADMIN && feedbackData.userId !== req.user?.id) {
        res.status(403).json({
          message: 'You can only create feedback for yourself'
        });
        return;
      }

      const feedback = await this.feedbackService.createFeedback(feedbackData);
      
      // Transformer la réponse selon le rôle de l'utilisateur
      const responseData = transformFeedbackToResponse(feedback, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Feedback created successfully',
        feedback: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllFeedbacks(req: Request, res: Response): Promise<void> {
    try {
      const feedbacks = await this.feedbackService.getAllFeedbacks();
      
      // Si c'est un admin, renvoyer tous les feedbacks
      // Si c'est un utilisateur normal, filtrer pour ne montrer que ses propres feedbacks
      if (req.user?.role === UserRole.ADMIN) {
        const responseData = transformFeedbacksToResponse(feedbacks, UserRole.ADMIN);
        res.json(responseData);
      } else if (req.user) {
        const userFeedbacks = feedbacks.filter(feedback => 
          feedback.user && feedback.user.id === req.user?.id
        );
        const responseData = transformFeedbacksToResponse(userFeedbacks, UserRole.USER);
        res.json(responseData);
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getFeedbackById(req: Request, res: Response): Promise<void> {
    try {
      const feedbackId = parseInt(req.params.id);
      const feedback = await this.feedbackService.getFeedbackById(feedbackId);

      if (!feedback) {
        res.status(404).json({ message: 'Feedback not found' });
        return;
      }

      // Vérifier que l'utilisateur est autorisé à voir ce feedback
      if (req.user?.role === UserRole.ADMIN || 
          (feedback.user && feedback.user.id === req.user?.id)) {
        const responseData = transformFeedbackToResponse(
          feedback, 
          req.user?.role as UserRole
        );
        res.json(responseData);
      } else {
        res.status(403).json({ message: 'You are not authorized to view this feedback' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getFeedbacksByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      
      // Si ce n'est pas un admin et que l'utilisateur demande les feedbacks d'un autre utilisateur
      if (req.user?.role !== UserRole.ADMIN && req.user?.id !== userId) {
        res.status(403).json({ message: 'You can only view your own feedbacks' });
        return;
      }
      
      const feedbacks = await this.feedbackService.getFeedbacksByUser(userId);
      const responseData = transformFeedbacksToResponse(
        feedbacks, 
        req.user?.role as UserRole
      );
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateFeedback(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = FeedbackUpdateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const feedbackId = parseInt(req.params.id);
      
      // Vérifier d'abord si le feedback existe
      const existingFeedback = await this.feedbackService.getFeedbackById(feedbackId);
      if (!existingFeedback) {
        res.status(404).json({ message: 'Feedback not found' });
        return;
      }
      
      // Vérifier les autorisations
      if (req.user?.role !== UserRole.ADMIN && existingFeedback.user.id !== req.user?.id) {
        res.status(403).json({ message: 'You can only update your own feedbacks' });
        return;
      }
      
      const updatedFeedback = await this.feedbackService.updateFeedback(feedbackId, updateData);
      
      const responseData = transformFeedbackToResponse(
        updatedFeedback, 
        req.user?.role as UserRole
      );

      res.json({
        message: 'Feedback updated successfully',
        feedback: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteFeedback(req: Request, res: Response): Promise<void> {
    try {
      const feedbackId = parseInt(req.params.id);
      
      // Vérifier d'abord si le feedback existe
      const existingFeedback = await this.feedbackService.getFeedbackById(feedbackId);
      if (!existingFeedback) {
        res.status(404).json({ message: 'Feedback not found' });
        return;
      }
      
      // Vérifier les autorisations
      if (req.user?.role !== UserRole.ADMIN && existingFeedback.user.id !== req.user?.id) {
        res.status(403).json({ message: 'You can only delete your own feedbacks' });
        return;
      }
      
      const isDeleted = await this.feedbackService.deleteFeedback(feedbackId);

      res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}