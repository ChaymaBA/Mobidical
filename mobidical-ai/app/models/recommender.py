from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

class GameRecommender:
    def __init__(self):
        self.data = None
        
    def load_dataset(self):
        from config import Config
        try:
            self.data = pd.read_csv(Config.DATA_PATH)
        except Exception as e:
            print(f"Error loading dataset: {e}")
            self.data = pd.DataFrame()
            
    def preprocess_data(self):
        # Prétraitement des données
        if self.data is not None and not self.data.empty:
            self.data = self.data.fillna("")
            
    def get_recommendations(self, user_preferences, num_recommendations=5):
        if self.data is None or self.data.empty:
            return []

        # 1. Récupérer les préférences utilisateur (par exemple favorite_activities)
        preferences_text = " ".join(user_preferences["favorite_activities"])
        
        # 2. Créer un corpus avec les noms des jeux et les préférences utilisateur
        corpus = self.data["name"].tolist() + [preferences_text]

        # 3. Appliquer la vectorisation TF-IDF pour obtenir des représentations vectorielles des jeux et des préférences
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(corpus)
        
        # 4. Calculer la similarité entre les jeux et les préférences utilisateur
        similarities = cosine_similarity(tfidf_matrix[:-1], tfidf_matrix[-1:]).flatten()

        # 5. Ajouter les scores de similarité aux données des jeux
        self.data["similarity_score"] = similarities

        # 6. Trier les jeux par score de similarité décroissant
        recommended_games = self.data.sort_values(by="similarity_score", ascending=False).head(num_recommendations)

        # Retourner les jeux recommandés sous forme de dictionnaire
        return recommended_games.to_dict('records')
    
    def enrich_recommendations(self, recommendations):
        # Ajouter des informations supplémentaires aux recommandations
        for rec in recommendations:
            rec["score"] = round(0.85, 2)  # Exemple de score
        return recommendations
        
    def get_all_games(self):
        if self.data is None or self.data.empty:
            return []
        return self.data.to_dict('records')
