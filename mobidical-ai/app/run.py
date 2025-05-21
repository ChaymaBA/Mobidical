# app/run.py
import os
import datetime
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from api.routes.recommend_routes import recommend_bp
from utils.logger import setup_logger

def create_app(config=None):
    """
    Crée et configure l'application Flask
    """
    app = Flask(
        __name__,
        static_folder='static',
        template_folder='templates'
    )
    
    # Configuration CORS améliorée - CORRECTION PRINCIPALE
    CORS(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
            "supports_credentials": False,
            "max_age": 600
        }
    })
    
    # Headers CORS manuels en backup
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Max-Age', '600')
        return response

    # Chemins des ressources internes (models, data)
    app.config.update(
        MODELS_PATH=os.path.join(app.root_path, 'models'),
        DATA_PATH=os.path.join(app.root_path, 'data')
    )

    # Appliquer une configuration externe si elle est fournie
    if config:
        app.config.update(config)

    # Initialisation du logger
    setup_logger(name=__name__)
    app.logger.info("Logger initialized")

    # Enregistrement des blueprints
    app.register_blueprint(recommend_bp, url_prefix='/api')

    # Routes de base
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/health')
    def health():
        return jsonify({
            "status": "healthy", 
            "version": "1.0.0",
            "timestamp": datetime.datetime.now().isoformat()
        })
    
    # Route de test pour diagnostiquer les connexions
    @app.route('/api/test-connection', methods=['GET', 'POST', 'OPTIONS'])
    def test_connection():
        if request.method == 'OPTIONS':
            return '', 204
        
        return jsonify({
            "status": "connected",
            "method": request.method,
            "timestamp": datetime.datetime.now().isoformat(),
            "client_ip": request.remote_addr,
            "headers": dict(request.headers)
        }), 200

    # Gestion des erreurs
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({
            "status": "error",
            "message": "Route not found"
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f"Internal error: {error}")
        return jsonify({
            "status": "error",
            "message": "Internal server error"
        }), 500

    return app

def run():
    """
    Lance le serveur Flask
    """
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.logger.info(f"Starting application on host=0.0.0.0, port={port}")
    
    # CORRECTION: Configuration serveur optimisée
    app.run(
        host='0.0.0.0',  # Écoute sur toutes les interfaces
        port=port,
        debug=True,
        threaded=True,   # Support multi-threading
        use_reloader=False,  # Évite les conflits en production
        use_debugger=True
    )

if __name__ == '__main__':
    run()