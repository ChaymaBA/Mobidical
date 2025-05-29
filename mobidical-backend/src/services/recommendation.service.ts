import { RecommendationRequest, RecommendationResponse } from '@/types/recommendation.type';
import { API_CONSTANTS } from '@/constants/flask_api_url';
import { PreferenceRepository } from '@/repositories/preferences.repository';

export class RecommendationService {
  private baseUrl: string;

  constructor(
    private readonly preferenceRepository: PreferenceRepository
  ) {
    this.baseUrl = API_CONSTANTS.FLASK_API_URL;
  }

  /**
   * Récupère les préférences d'un enfant depuis la base de données
   * puis envoie une requête à l'API Flask pour obtenir des recommandations.
   */
  async getRecommendationsByChildId(childId: string): Promise<RecommendationResponse> {
    try {
      const preferences = await this.preferenceRepository.getPreferencesByChildId(Number(childId));

      if (!preferences) {
        throw new Error('Aucune préférence trouvée pour cet enfant.');
      }

      const requestBody: RecommendationRequest = {
        preferred_colors: Array.isArray(preferences.preferred_colors)
          ? preferences.preferred_colors
          : [preferences.preferred_colors],
        audio_sensitivity: preferences.audio_sensitivity,
        visual_complexity: preferences.visual_complexity,
        prefers_animations: preferences.prefers_animations,
        favorite_activities: preferences.favorite_activities,
      };

      console.log(`Sending request to Flask API: ${this.baseUrl}/recommend`, requestBody);

      // CORRECTION: Configuration fetch améliorée
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 secondes timeout

      try {
        const response = await fetch(`${this.baseUrl}/recommend`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'RecommendationClient/1.0'
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
          // Ajout de ces options pour améliorer la robustesse
          keepalive: true,
          
        });

        clearTimeout(timeoutId);

        console.log(`Response status: ${response.status}`);
        console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Flask API error (${response.status}):`, errorText);
          throw new Error(`Erreur HTTP depuis Flask: ${response.status} - ${errorText}`);
        }

        const flaskRecommendations = await response.json();
        console.log('Flask response:', flaskRecommendations);

        return {
          success: true,
          recommendations: flaskRecommendations as string[],
        };

      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }

    } catch (error) {
      console.error('Erreur lors de la récupération des recommandations:', error);
      
      // Diagnostic amélioré des erreurs
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Timeout: La requête a pris plus de 30 secondes');
          return {
            success: false,
            error: 'Timeout: Le serveur met trop de temps à répondre. Vérifiez la connexion.',
          };
        } else if (error.message.includes('fetch failed')) {
          console.error('Erreur de connexion réseau');
          return {
            success: false,
            error: 'Impossible de se connecter au serveur Flask. Vérifiez que le serveur est démarré sur http://192.168.1.12:5000',
          };
        }
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      };
    }
  }}