from flask import Blueprint, request, jsonify # type: ignore
from services.recommendation_service import recommendation_service
from utils.logger import setup_logger

recommend_bp = Blueprint('recommend', __name__)
logger = setup_logger(__name__)

@recommend_bp.route('/recommend', methods=['POST'])
def recommend_games():  # Modifié de recommend_trips à recommend_games pour refléter la fonctionnalité
    try:
        user_data = request.get_json()
        logger.info(f"Received recommendation request: {user_data}")
        
        if not user_data:
            return jsonify({"error": "No user preferences provided"}), 400
            
        response = recommendation_service.generate_recommendations(user_data)
        return jsonify(response), 200
        
    except KeyError as e:
        logger.error(f"Missing key in request: {e}")
        return jsonify({"error": f"Missing required parameter: {e}"}), 400
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}")
        return jsonify({"error": str(e)}), 500
        

