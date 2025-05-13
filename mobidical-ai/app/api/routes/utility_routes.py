from flask import Blueprint, jsonify # type: ignore
from services.recommendation_service import recommendation_service
from utils.logger import setup_logger

utility_bp = Blueprint('utility', __name__)
logger = setup_logger(__name__)

@utility_bp.route('/filters', methods=['GET'])
def get_filters():
    try:
        filters = recommendation_service.get_filters()
        return jsonify({"filters": filters}), 200
    except Exception as e:
        logger.error(f"Error fetching filters: {e}")
        return jsonify({"error": str(e)}), 500

@utility_bp.route('/games', methods=['GET'])
def get_all_games():
    try:
        games = recommendation_service.get_all_games()
        return jsonify({"games": games}), 200
    except Exception as e:
        logger.error(f"Error fetching all games: {e}")
        return jsonify({"error": str(e)}), 500

