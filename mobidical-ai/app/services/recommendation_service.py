import pandas as pd  # type: ignore
import logging
from models.recommender import GameRecommender

# Set up logger
logger = logging.getLogger(__name__)

# Singleton recommender initialization
recommender = GameRecommender()
recommender.load_dataset()
recommender.preprocess_data()

class RecommendationService:
    def generate_recommendations(self, user_data):
        logger.info("Generating recommendations with user data: %s", user_data)

        # Préparation des préférences utilisateur avec des valeurs par défaut robustes
        user_preferences = {
            "preferred_colors": user_data.get("preferred_colors", ""),
            "audio_sensitivity": user_data.get("audio_sensitivity", "medium"),
            "prefers_animations": user_data.get("prefers_animations", False),
            "visual_complexity": int(user_data.get("visual_complexity", 2)),
            "favorite_activities": user_data.get("favorite_activities", "")
        }

        # Nombre de recommandations à générer
        num_recommendations = int(user_data.get("num_recommendations", 3))

        # Récupération des recommandations
        recommendations = recommender.get_recommendations(user_preferences, num_recommendations)
        enriched = recommender.enrich_recommendations(recommendations)

        return {
            "recommendations": enriched,
            "metadata": {
                "preferences_used": user_preferences,
                "recommendation_time": pd.Timestamp.now().isoformat()
            }
        }

    def get_all_games(self):
        return recommender.get_all_games()

    def get_filters(self):
        return {
            "audio_sensitivity": ["low", "medium", "high"],
            "visual_complexity": [1, 2, 3, 4, 5],
            "preferred_colors": ["red", "blue", "green", "yellow", "purple"],
            "favorite_activities": ["puzzle", "drawing", "music", "sorting", "counting"]
        }

# Instance singleton
recommendation_service = RecommendationService()
