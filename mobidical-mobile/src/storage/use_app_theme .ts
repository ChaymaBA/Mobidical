import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { StyleProp, useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, useTheme as useNavTheme } from "@react-navigation/native"
import { type Theme, type ThemedStyle, type ThemedStyleArray } from "../theme"
import * as SystemUI from "expo-system-ui"

// Importer les fichiers de couleurs, espacements et styles
import { colors } from "../theme/colors"
import { spacing } from "../theme/spacing"
import { typography } from "../theme/typography"
import { $styles as styles } from "../theme/styles"
import { images } from "../theme/images" 

type ThemeContexts = "light" | "dark" | undefined

type ThemeContextType = {
    themeScheme: ThemeContexts
    setThemeContextOverride: (newTheme: ThemeContexts) => void
}

// Créer un contexte pour le thème actuel
export const ThemeContext = createContext<ThemeContextType>({
    themeScheme: undefined,
    setThemeContextOverride: (_newTheme: ThemeContexts) => {
        console.error("Tried to call setThemeContextOverride before the ThemeProvider was initialized")
    },
})

// Fonction pour convertir le contexte de thème en un objet de thème
const themeContextToTheme = (themeContext: ThemeContexts): Theme => ({
    ... (themeContext === "dark" ? DarkTheme : DefaultTheme), // Utiliser le thème par défaut de React Navigation
    colors: colors, // Ajoute les couleurs personnalisées ici
    spacing: spacing, // Ajoute les espacements personnalisés ici
    typography: typography, // Ajoute la typographie personnalisée ici
    styles: styles, // Ajoute les styles personnalisés ici
    images: images, // Ajoute les images personnalisées ici, si tu en as
})

const setImperativeTheming = (theme: Theme) => {
    SystemUI.setBackgroundColorAsync(theme.colors.background)
}

// Hook pour fournir et gérer le contexte du thème
export const useThemeProvider = (initialTheme: ThemeContexts = undefined) => {
    const colorScheme = useColorScheme()
    const [overrideTheme, setTheme] = useState<ThemeContexts>(initialTheme)

    const setThemeContextOverride = useCallback((newTheme: ThemeContexts) => {
        setTheme(newTheme)
    }, [])

    const themeScheme = overrideTheme || colorScheme || "light"
    const navigationTheme = themeScheme === "dark" ? DarkTheme : DefaultTheme

    useEffect(() => {
        setImperativeTheming(themeContextToTheme(themeScheme))
    }, [themeScheme])

    return {
        themeScheme,
        navigationTheme,
        setThemeContextOverride,
        ThemeProvider: ThemeContext.Provider,
    }
}

interface UseAppThemeValue {
    // L'objet thème provenant de react-navigation
    navTheme: typeof DefaultTheme
    // Une fonction pour définir l'override du contexte du thème
    setThemeContextOverride: (newTheme: ThemeContexts) => void
    // L'objet thème actuel
    theme: Theme
    // Le contexte du thème ("light" | "dark")
    themeContext: ThemeContexts
    // Fonction pour appliquer le thème à un objet de style
    themed: <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => T
}

// Hook custom pour fournir le thème et les utilitaires pour les thèmes
export const useAppTheme = (): UseAppThemeValue => {
    const navTheme = useNavTheme()
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }

    const { themeScheme: overrideTheme, setThemeContextOverride } = context

    const themeContext: ThemeContexts = useMemo(
        () => overrideTheme || (navTheme.dark ? "dark" : "light"),
        [overrideTheme, navTheme],
    )

    const themeVariant: Theme = useMemo(() => themeContextToTheme(themeContext), [themeContext])

    const themed = useCallback(
        <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T> | ThemedStyleArray<T>) => {
            const flatStyles = [styleOrStyleFn].flat(3)
            const stylesArray = flatStyles.map((f) => {
                if (typeof f === "function") {
                    return (f as ThemedStyle<T>)(themeVariant)
                } else {
                    return f
                }
            })

            // Aplatir le tableau de styles en un seul objet
            return Object.assign({}, ...stylesArray) as T
        },
        [themeVariant],
    )

    return {
        navTheme,
        setThemeContextOverride,
        theme: themeVariant,
        themeContext,
        themed,
    }
}
