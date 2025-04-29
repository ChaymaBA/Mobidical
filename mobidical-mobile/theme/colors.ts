
export const palette = {

    // coleur premieur 
    owl100: "#EDC8A3FF",   
    owl200: "#35B1AFFF",    
    owlBook: "#357ABD",  
    owlBeak: "#FFCC00",   

    // Couleurs secondaire 
    lion100: "#FFA726",   
    liongreen: "#0EB838FF",   
    lionRed: "##FF3B30",  
    lionBook: "#007AFF",  
    lionTongue: "#E57373",
    

    text200:"#999",
    text100: "#666",  

    background100: "#F5F5F5", 

    // Overlays
    overlay20: "rgba(25, 16, 21, 0.2)",
    overlay50: "rgba(25, 16, 21, 0.5)",

    white: "#FFFFFF",
    black : "#000000",
} as const;

export const colors = {
    /**
     * La palette complète des couleurs.
     */
    palette,
    /**
     * Couleur transparente.
     */
    transparent: "rgba(0, 0, 0, 0)",
    /**
     * Couleur principale de texte.
     */
    text: palette.text100,
    /**
     * Texte secondaire.
     */
    textDim: palette.text100,
    /**
     * Couleur de fond principale.
     */
    background: palette.background100,
    /**
     * Couleur de la bordure par défaut.
     */
    border: palette.black,
 
    secondary: palette.lion100,
    /**
     * Couleur d'accentuation.
     */
    accent: palette.owlBeak,
    /**
     * Séparateur pour diviser les éléments visuellement.
     */
    separator: palette.black,
    /**
     * Couleur pour les erreurs.
     */
    error: palette.lionTongue,
    /**
     * Fond d’erreur.
     */
    errorBackground: palette.overlay20,
} as const;
