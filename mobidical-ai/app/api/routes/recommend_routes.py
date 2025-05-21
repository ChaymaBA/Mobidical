from flask import Blueprint, request, jsonify
from services.recommendation_service import recommendation_service
from utils.logger import setup_logger
import traceback
import time

recommend_bp = Blueprint('recommend', __name__)
logger = setup_logger(__name__)

@recommend_bp.route('/recommend', methods=['POST', 'OPTIONS'])
def recommend_games():
    start_time = time.time()
    
   
    
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS preflight request")
        response = jsonify({})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response, 200
        
    try:
        # Log the raw request for debugging
        raw_data = request.get_data()
        logger.info(f"Raw data received: {raw_data}")
        
        # Try to parse JSON data with robust error handling
        try:
            user_data = request.get_json(force=True)
            logger.info(f"Parsed user data: {user_data}")
        except Exception as e:
            logger.error(f"Error parsing JSON data: {e}")
            return jsonify({"error": "Invalid JSON format", "detail": str(e)}), 400
            
        if not user_data:
            logger.warning("Empty user data received")
            return jsonify({"error": "No user preferences provided"}), 400

        # Define required fields
        required_fields = ["preferred_colors", "audio_sensitivity", "prefers_animations", "visual_complexity", "favorite_activities"]
        
        # Check for missing fields but provide defaults if possible
        for field in required_fields:
            if field not in user_data:
                logger.warning(f"Missing field '{field}' - using default value")
                
                # Set default values based on field
                if field == "preferred_colors":
                    user_data[field] = ""
                elif field == "audio_sensitivity":
                    user_data[field] = "medium"
                elif field == "prefers_animations":
                    user_data[field] = False
                elif field == "visual_complexity":
                    user_data[field] = 2
                elif field == "favorite_activities":
                    user_data[field] = ""

        logger.info("Starting recommendation generation...")
        
        # Generate recommendations
        response_data = recommendation_service.generate_recommendations(user_data)
        
        processing_time = time.time() - start_time
        logger.info(f"Generated {len(response_data.get('recommendations', []))} recommendations in {processing_time:.2f}s")
        
        # Ajouter des métadonnées de performance
        response_data['metadata'] = response_data.get('metadata', {})
        response_data['metadata']['processing_time'] = processing_time
        response_data['metadata']['server_timestamp'] = time.time()
        
        logger.info("=== REPONSE ENVOYEE ===")
        return jsonify(response_data), 200

    except Exception as e:
        processing_time = time.time() - start_time
        # Log the full exception with traceback for debugging
        logger.error(f"Error generating recommendations after {processing_time:.2f}s: {str(e)}")
        logger.error(traceback.format_exc())
        
        return jsonify({
            "error": str(e),
            "processing_time": processing_time,
            "timestamp": time.time()
        }), 500

@recommend_bp.route('/filters', methods=['GET'])
def get_filters():
    """Get available filters for the recommendation system"""
    try:
        logger.info("Getting filters...")
        filters = recommendation_service.get_filters()
        return jsonify(filters), 200
    except Exception as e:
        logger.error(f"Error getting filters: {e}")
        return jsonify({"error": str(e)}), 500

@recommend_bp.route('/games', methods=['GET'])
def get_all_games():
    """Get all games from the dataset"""
    try:
        logger.info("Getting all games...")
        games = recommendation_service.get_all_games()
        return jsonify({"games": games}), 200
    except Exception as e:
        logger.error(f"Error getting games: {e}")
        return jsonify({"error": str(e)}), 500

