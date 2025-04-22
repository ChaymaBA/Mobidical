export const Darkpalette = {
    // Couleur premier
    owl100: "#F0B87E",      // Version plus claire pour le mode sombre
    owl200: "#B07A40",      // Version ajustée pour le mode sombre
    owlBook: "#4A95DE",     // Version plus vive pour le mode sombre
    owlBeak: "#FFD633",     // Version plus lumineuse pour le mode sombre

    // Couleurs secondaire
    lion100: "#FFB74D",     // Version plus lumineuse pour le mode sombre
    liongreen: "#4CD964",   // Version plus vive pour le mode sombre
    lionRed: "#FF5147",     // Correction de la valeur (avait deux #) et plus lumineuse
    lionBook: "#2196F3",    // Version ajustée pour le mode sombre
    lionTongue: "#EF9A9A",  // Version plus claire pour le mode sombre

    text200: "#BBBBBB",     // Version plus claire pour le mode sombre
    text100: "#EEEEEE",     // Version beaucoup plus claire pour le mode sombre
    background100: "#121212", // Fond sombre standard

    // Overlays
    overlay20: "rgba(0, 0, 0, 0.2)",     // Ajusté pour le mode sombre
    overlay50: "rgba(0, 0, 0, 0.5)",     // Ajusté pour le mode sombre

    white: "#FFFFFF",
    black: "#000000",
} as const;

export const darkColors = {
    /**
     * La palette complète des couleurs.
     */
    palette: Darkpalette,
        
    transparent: "rgba(0, 0, 0, 0)",
   
    text: Darkpalette.text100,
   
    textDim: Darkpalette.text200,
    /**
     * Couleur de fond principale.
     */
    background: Darkpalette.background100,
    /**
     * Couleur de la bordure par défaut.
     */
    border: Darkpalette.text200,

    secondary: Darkpalette.lion100,
    /**
     * Couleur d'accentuation.
     */
    accent: Darkpalette.owlBeak,
    /**
     * Séparateur pour diviser les éléments visuellement.
     */
    separator: Darkpalette.text200,
    /**
     * Couleur pour les erreurs.
     */
    error: Darkpalette.lionRed,
    /**
     * Fond d'erreur.
     */
    errorBackground: "rgba(255, 59, 48, 0.1)", // Fond d'erreur subtil pour le mode sombre
} as const;