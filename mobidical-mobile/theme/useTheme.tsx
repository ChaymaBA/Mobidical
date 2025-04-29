import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palette, colors } from './colors';
import { Darkpalette, darkColors } from './colorsDark';

export default function useTheme() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Charger le thème sauvegardé au démarrage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('userTheme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        } else {
          setIsDarkMode(systemColorScheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  // Persister le thème à chaque changement
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    AsyncStorage.setItem('userTheme', newMode ? 'dark' : 'light');
  };

  const theme = isDarkMode ? {
    background: darkColors.background,
    card: Darkpalette.background100,
    headerBackground: Darkpalette.white,
    textPrimary: colors.palette.white,
    textSecondary: darkColors.textDim,
    iconColor: Darkpalette.text100,
    accent: darkColors.textDim,
    switchTrackActive: Darkpalette.text100,
    switchTrackInactive: Darkpalette.overlay50,
    switchThumb: Darkpalette.white,
    error: darkColors.error,
    border: darkColors.border,
    separator: darkColors.separator,
    transparent: "rgba(0, 0, 0, 0)",
    primary: Darkpalette.white,
    errorBackground: "rgba(255, 59, 48, 0.1)"
  } : {
    background: colors.background,
    card: palette.white,
    headerBackground: palette.owl100,
    textPrimary: colors.text,
    textSecondary: colors.textDim,
    iconColor: palette.black,
    accent: colors.palette.text200,
    switchTrackActive: palette.overlay50,
    switchTrackInactive: palette.overlay50,
    switchThumb: palette.white,
    error: colors.error,
    border: colors.border,
    separator: colors.separator,
    transparent: "rgba(0, 0, 0, 0)",
    primary: palette.text100,
    errorBackground: palette.overlay20
  };

  return { isDarkMode, theme, toggleTheme };
}