from api.routes.recommend_routes import recommend_bp
from api.routes.utility_routes import utility_bp

def register_routes(app):
    app.register_blueprint(recommend_bp, url_prefix='/api')
    app.register_blueprint(utility_bp, url_prefix='/api')