import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { RecommendationService } from '@/services/recommendation.service';
import { handleError } from '@/core/errors/errorHandler';

export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  /**
   * Récupérer les recommandations pour un enfant en fonction de ses préférences.
   */
  async getRecommendations(req: Request, res: Response): Promise<void> {
    try {
      const childId = req.user?.child_id;

      if (!childId) {
        res.status(400).json({
          message: 'Identifiant de l’enfant manquant dans le token.',
        });
        return;
      }

      const response = await this.recommendationService.getRecommendationsByChildId(
        String(childId)
      );

      if (!response.success) {
        res.status(400).json({
          message: response.error || 'Erreur lors de la récupération des recommandations',
        });
        return;
      }

      res.status(200).json({
        message: 'Recommandations récupérées avec succès',
        data: response.recommendations, // Supposé champ contenant les données
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Données invalides',
          errors: error.errors,
        });
        return;
      }

      console.error('Erreur dans getRecommendations:', error);
      handleError(res, error);
    }
  }
}
