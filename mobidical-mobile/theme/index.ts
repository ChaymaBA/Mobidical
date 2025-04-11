import React, { useState, useEffect, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Darkpalette } from './colorsDark';
import { palette as importedPalette } from './colors';
import { ThemeProvider, ThemeColors, createTheme } from './themeProvider';

type ThemePalette = typeof palette;

export const palette = importedPalette;
export { Darkpalette as exportedDarkPalette };

export const lightTheme = createTheme(palette, false);
export const darkTheme = createTheme(Darkpalette, true);

export const colors = lightTheme;
export const darkColors = darkTheme;


