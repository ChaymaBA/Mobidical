import pandas as pd # type: ignore
from models.recommender import GameRecommender

# Singleton recommender initialization
recommender = GameRecommender()
recommender.load_dataset()
recommender.preprocess_data()

class RecommendationService:
    def generate_recommendations(self, user_data):
        user_preferences = {
            "preferred_colors": user_data.get("preferred_colors", ""),
            "audio_sensitivity": user_data.get("audio_sensitivity", "medium"),
            "prefers_animations": user_data.get("prefers_animations", False),
            "visual_complexity": user_data.get("visual_complexity", 2),
            "favorite_activities": user_data.get("favorite_activities", "")
        }
        
        recommendations = recommender.get_recommendations(
            user_preferences,
            num_recommendations=user_data.get("num_recommendations", 5)
        )
        
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

recommendation_service = RecommendationService()
