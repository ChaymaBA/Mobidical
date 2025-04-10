import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { palette, colors } from './colors';
import { Darkpalette, darkColors } from './colorsDark';

export default function useTheme() {
  // Détecte le mode par défaut du système
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Met à jour le thème en fonction du mode sombre/clair
  const theme = isDarkMode ? {
    // Thème sombre
    background: darkColors.background,
    card: Darkpalette.background100,
    headerBackground: Darkpalette.owl200,
    textPrimary: darkColors.text,
    textSecondary: darkColors.textDim,
    iconColor: Darkpalette.owl100,
    accent: darkColors.accent,
    switchTrackActive: Darkpalette.owlBook,
    switchTrackInactive: Darkpalette.overlay50,
    switchThumb: Darkpalette.white,
    error: darkColors.error,
    border: darkColors.border,
    separator: darkColors.separator
  } : {
    // Thème clair
    background: colors.background,
    card: palette.white,
    headerBackground: palette.owl100,
    textPrimary: colors.text,
    textSecondary: colors.textDim,
    iconColor: palette.owl200,
    accent: colors.accent,
    switchTrackActive: palette.owlBook,
    switchTrackInactive: palette.overlay50,
    switchThumb: palette.white,
    error: colors.error,
    border: colors.border,
    separator: colors.separator
  };

  // Fonction pour changer de thème
  const toggleTheme = () => {
    setIsDarkMode(previous => !previous);
  };

  return { isDarkMode, theme, toggleTheme };
}