import { Router } from 'express';
import { RecommendationController } from '@/api/controllers/recommendation.controller';
import { RecommendationService } from '@/services/recommendation.service';
import { PreferenceRepository } from '@/repositories/preferences.repository';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
export default function (controllers: { recommendationController: RecommendationController }): Router {
  const router = Router();
  const { recommendationController } = controllers;


const controller = new RecommendationController(
  new RecommendationService(new PreferenceRepository())
);

router.get('/',AuthMiddleware.authenticate, controller.getRecommendations.bind(controller));

return router;}
