const palette = {
    // Couleurs du fond adaptées à l'image
    background100: "#F5E1A6",  // Beige clair (couleur dominante de l'image)
    background200: "#DCC48E",  // Beige plus foncé pour la variation

    // coleur premieur 
    owl100: "#D29A61",    // Brun clair
    owl200: "#8B5A2B",    // Brun foncé
    owlBeak: "#F4B400",   // Jaune bec
    owlEye: "#FFD700",    // Jaune œil
    owlBook: "#357ABD",   // Bleu livre

    // Couleurs secondaire 
    lion100: "#FFA726",   // Orange clair
    lion200: "#D84315",   // Orange foncé
    lionMane: "#A52A2A",  // Brun foncé crinière
    lionBook: "#3388C9FF",  // Bleu livre
    lionTongue: "#E57373", // Rose langue

    // Autres couleurs utiles
    text100: "#3C3836",   // Texte principal
    text200: "#564E4A",   // Texte secondaire
    border: "#B6ACA6",    // Bordure neutre

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
    textDim: palette.text200,
    /**
     * Couleur de fond principale.
     */
    background: palette.background100,
    /**
     * Couleur de la bordure par défaut.
     */
    border: palette.border,
    /**
     * Couleur principale utilisée pour les éléments interactifs.
     */
    primary: palette.owl200,
    /**
     * Couleur secondaire.
     */
    secondary: palette.lion100,
    /**
     * Couleur d'accentuation.
     */
    accent: palette.owlBeak,
    /**
     * Séparateur pour diviser les éléments visuellement.
     */
    separator: palette.border,
    /**
     * Couleur pour les erreurs.
     */
    error: palette.lionTongue,
    /**
     * Fond d’erreur.
     */
    errorBackground: palette.overlay20,
} as const;
