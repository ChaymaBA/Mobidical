// src/api/routes/feedback.routes.ts
import { Router } from 'express';
import { FeedbackController } from '@/api/controllers/feedback.controller';
import { FeedbackCreateDto, FeedbackUpdateDto } from '@/dtos/feedback.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { FEEDBACK_ROUTES } from '@/constants/routes.constants';


export default function (controllers: { feedbackController: FeedbackController }): Router {
  const router = Router();
  const { feedbackController } = controllers;

  /**
   * Route pour obtenir tous les feedbacks
   * - Pour les admins : tous les feedbacks sont visibles
   * - Pour les utilisateurs normaux : seulement leurs propres feedbacks sont visibles
   * (le filtrage est fait dans le contrôleur)
   */
  router.get(
    FEEDBACK_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    feedbackController.getAllFeedbacks.bind(feedbackController)
  );

  /**
   * Route pour obtenir un feedback par ID
   * - Pour les admins : tous les feedbacks sont accessibles
   * - Pour les utilisateurs normaux : seulement leurs propres feedbacks sont accessibles
   * (la vérification est faite dans le contrôleur)
   */
  router.get(
    FEEDBACK_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    feedbackController.getFeedbackById.bind(feedbackController)
  );

  /**
   * Route pour obtenir les feedbacks d'un utilisateur spécifique
   * - Pour les admins : peut accéder aux feedbacks de n'importe quel utilisateur
   * - Pour les utilisateurs normaux : seulement leurs propres feedbacks
   * (la vérification est faite dans le contrôleur)
   */
  router.get(
    FEEDBACK_ROUTES.GET_BY_USER,
    AuthMiddleware.authenticate,
    feedbackController.getFeedbacksByUser.bind(feedbackController)
  );

  /**
   * Route pour créer un feedback
   * - Accessible à tous les utilisateurs authentifiés
   * (la vérification pour s'assurer qu'un utilisateur ne crée des feedbacks que pour lui-même
   * est faite dans le contrôleur)
   */
  router.post(
    FEEDBACK_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(FeedbackCreateDto),
    feedbackController.createFeedback.bind(feedbackController)
  );

  /**
   * Route pour mettre à jour un feedback
   * - Pour les admins : peut mettre à jour n'importe quel feedback
   * - Pour les utilisateurs normaux : seulement leurs propres feedbacks
   * (la vérification est faite dans le contrôleur)
   */
  router.put(
    FEEDBACK_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(FeedbackUpdateDto),
    feedbackController.updateFeedback.bind(feedbackController)
  );

  /**
   * Route pour supprimer un feedback
   * - Pour les admins : peut supprimer n'importe quel feedback
   * - Pour les utilisateurs normaux : seulement leurs propres feedbacks
   * (la vérification est faite dans le contrôleur)
   */
  router.delete(
    FEEDBACK_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    feedbackController.deleteFeedback.bind(feedbackController)
  );

  return router;
}