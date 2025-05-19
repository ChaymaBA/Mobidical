from flask_sqlalchemy import SQLAlchemy

# Create the db instance
db = SQLAlchemy()
class Preference(db.Model):
    __tablename__ = 'preferences'

    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, nullable=False)
    preferred_colors = db.Column(db.String)
    audio_sensitivity = db.Column(db.String)
    prefers_animations = db.Column(db.Boolean)
    visual_complexity = db.Column(db.Integer)
    favorite_activities = db.Column(db.String)  # ex: "puzzle,drawing,music"
