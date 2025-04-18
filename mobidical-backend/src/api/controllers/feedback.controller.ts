import { Request, Response } from 'express';
import { FeedbackService } from '@/services/feedback.service';
import { handleError } from '@/core/errors/errorHandler';
import {
  transformFeedbackToResponse,
  transformFeedbacksToResponse
} from '@/dtos/feedback.dto';
import { UserRole } from '@/types/enum.type';

export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  async createFeedback(req: Request, res: Response): Promise<void> {
    try {
      const feedbackData = req.body;
      const userId = req.user?.id as number;
      const feedback = await this.feedbackService.createFeedback(userId, feedbackData);
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
      const responseData = transformFeedbacksToResponse(feedbacks, req.user?.role as UserRole);
      res.json(responseData);
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

      const responseData = transformFeedbackToResponse(feedback, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getFeedbacksByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const feedbacks = await this.feedbackService.getFeedbacksByUser(userId);
      const responseData = transformFeedbacksToResponse(feedbacks, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateFeedback(req: Request, res: Response): Promise<void> {
    try {
      const feedbackId = parseInt(req.params.id);
      const updateData = req.body;

      const updatedFeedback = await this.feedbackService.updateFeedback(feedbackId, updateData);

      if (!updatedFeedback) {
        res.status(404).json({ message: 'Feedback not found' });
        return;
      }

      const responseData = transformFeedbackToResponse(updatedFeedback, req.user?.role as UserRole);
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
      const deleted = await this.feedbackService.deleteFeedback(feedbackId);

      if (!deleted) {
        res.status(404).json({ message: 'Feedback not found or already deleted' });
        return;
      }

      res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
