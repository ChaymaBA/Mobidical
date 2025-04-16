// src/api/routes/feedback.routes.ts
import { Router } from 'express';
import { FeedbackController } from '@/api/controllers/feedback.controller';
import { FeedbackCreateDto, FeedbackUpdateDto } from '@/dtos/feedback.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { FEEDBACK_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { feedbackController: FeedbackController }): Router {
  const router = Router();
  const { feedbackController } = controllers;

  // Get all feedbacks route
  router.get(
    FEEDBACK_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
     AuthMiddleware.requireRole(UserRole.ADMIN),
    feedbackController.getAllFeedbacks.bind(feedbackController)
  );

  // Get feedback by ID route
  router.get(
    FEEDBACK_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    feedbackController.getFeedbackById.bind(feedbackController)
  );

  // Get feedbacks by user ID route
  router.get(
    FEEDBACK_ROUTES.GET_BY_USER,
    AuthMiddleware.authenticate,
    AuthMiddleware.isOwnerOrAdmin('userId'),
    feedbackController.getFeedbacksByUser.bind(feedbackController)
  );

  // Create feedback route
  router.post(
    FEEDBACK_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(FeedbackCreateDto),
    feedbackController.createFeedback.bind(feedbackController)
  );

  // Update feedback route
  router.put(
    FEEDBACK_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(FeedbackUpdateDto),
    feedbackController.updateFeedback.bind(feedbackController)
  );

  // Delete feedback route
  router.delete(
    FEEDBACK_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    feedbackController.deleteFeedback.bind(feedbackController)
  );

  return router;
}