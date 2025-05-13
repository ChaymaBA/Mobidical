import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost/mobidical")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
    CORS_ORIGINS = "*"
    DEBUG = True
    DATA_PATH = "data/datasets/exercises.csv"

def get_config():
    return Config
