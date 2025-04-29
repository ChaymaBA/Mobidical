import React, { useState, useEffect, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Darkpalette as darkPalette } from './colorsDark';
import { palette } from './colors';

// Types
type ThemePalette = typeof palette;
type CommonPalette = typeof palette | typeof darkPalette;

export interface ThemeColors {
    palette: CommonPalette;
    background: string;
    card: string;
    textPrimary: string;
    textSecondary: string;
    iconColor: string;
    switchTrackActive: string;
    switchTrackInactive: string;
    switchThumb: string;
    headerBackground: string;
    primary: string;
    accent: string;
    separator: string;
    error: string;
    errorBackground: string;
    transparent: string;
}

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    theme: ThemeColors;
}


export const createTheme = (palette: CommonPalette, isDark: boolean): ThemeColors => ({
    palette,
    background: palette.background100,
    card: isDark ? palette.black : palette.white,
    textPrimary: palette.text100,
    textSecondary: palette.text200,
    iconColor: isDark ? palette.text100 : palette.black,
    switchTrackActive: palette.owlBook,
    switchTrackInactive: palette.overlay20,
    switchThumb: palette.white,
    headerBackground: isDark ? palette.black : palette.white,
    primary: palette.owl100,
    accent: palette.white,
    separator: isDark ? palette.text200 : palette.black,
    error: isDark ? palette.lionRed : palette.lionTongue,
    errorBackground: isDark ? "rgba(255, 59, 48, 0.1)" : palette.overlay20,
    transparent: "rgba(0, 0, 0, 0)",
});

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook personnalisé
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Fournisseur de thème
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const deviceColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('themePreference');
                if (savedTheme !== null) {
                    setIsDarkMode(savedTheme === 'dark');
                }
            } catch (e) {
                console.error('Failed to load theme preference:', e);
            }
        };
        loadThemePreference();
    }, []);

    const saveThemePreference = async (isDark: boolean) => {
        try {
            await AsyncStorage.setItem('themePreference', isDark ? 'dark' : 'light');
        } catch (e) {
            console.error('Failed to save theme preference:', e);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            saveThemePreference(newMode);
            return newMode;
        });
    };

    const theme = createTheme(
        (isDarkMode ? darkPalette : palette) as CommonPalette,
        isDarkMode
    );

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

