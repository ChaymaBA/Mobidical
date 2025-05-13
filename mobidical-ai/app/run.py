import os
from flask import Flask
from config import Config
from __init__ import register_routes
from utils.logger import setup_logger

# Logger setup
logger = setup_logger(__name__)

# Create Flask app
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    register_routes(app)
    logger.info("App initialized with routes and config")
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=Config.DEBUG)