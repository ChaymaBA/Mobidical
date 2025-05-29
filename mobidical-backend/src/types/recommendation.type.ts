export interface RecommendationRequest {
  preferred_colors: string[]; // ex: ["blue", "green"]
  audio_sensitivity: string | boolean; // ex: "medium" ou true/false
  prefers_animations?: boolean;
  visual_complexity?: number | string; // ex: 1 à 5 ou "low", "medium", "high"
  favorite_activities: string[] | string; // ex: ["puzzle", "game"]
}

export interface RecommendationResponse {
  success: boolean;
  recommendations?: string[]; // ou un tableau d'objets si plus détaillé
  error?: string;
}

export interface ParsePreferencesRequest {
  raw_preferences: any; // Données brutes à parser
}

export interface ParsePreferencesResponse {
  success: boolean;
  parsed?: RecommendationRequest;
  error?: string;
}

export interface OptionsResponse {
  success: boolean;
  options?: AvailableOptions;
  error?: string;
}

export interface AvailableOptions {
  preferred_colors: string[];
  audio_sensitivity: string[]; // ["low", "medium", "high"]
  visual_complexity: string[]; // ["low", "medium", "high"]
  favorite_activities: string[]; // ["drawing", "puzzle", "game", ...]
  prefers_animations: boolean[];
}
