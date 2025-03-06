import type { StyleProp } from "react-native"
import { colors } from "./colors"
import { spacing } from "./spacing"
import { typography, customFontsToLoad } from "./typography"
import { $styles } from "./styles"

/**
 * L'objet Theme contient toutes les informations nécessaires pour styliser l'application.
 */
export interface Theme {
    colors: typeof colors // Définition des couleurs utilisées dans l'application.
    spacing: typeof spacing // Définition des espacements pour les marges et les paddings.
    typography: typeof typography // Définition des styles de typographie.
    styles: typeof $styles // Styles globaux prédéfinis.
}

/**
 * Définition du thème principal de l'application.
 */
export const theme: Theme = {
    colors, // Inclusion des couleurs définies dans colors.ts.
    spacing, // Inclusion des espacements définis dans spacing.ts.
    typography, // Inclusion des styles typographiques définis dans typography.ts.
    styles: $styles, // Inclusion des styles globaux.
}

/**
 * Représente une fonction qui retourne un style basé sur le thème fourni.
 * 
 * @template T Le type du style.
 * @param theme L'objet theme contenant toutes les informations de style.
 * @returns Le style appliqué en fonction du thème.
 * 
 * @example
 * const $container: ThemedStyle<ViewStyle> = (theme) => ({
 *   flex: 1,
 *   backgroundColor: theme.colors.background,
 *   justifyContent: "center",
 *   alignItems: "center",
 * })
 * 
 * // Utilisation dans un composant :
 * const Component = () => {
 *   const { themed } = useAppTheme()
 *   return <View style={themed($container)} />
 * }
 */
export type ThemedStyle<T> = (theme: Theme) => T

/**
 * Type permettant d'utiliser un tableau de styles pouvant être statiques ou dynamiques en fonction du thème.
 */
export type ThemedStyleArray<T> = (
    | ThemedStyle<T>
    | StyleProp<T>
    | (StyleProp<T> | ThemedStyle<T>)[]
)[]

/**
 * Hook permettant d'utiliser le thème dans les composants.
 * 
 * @returns L'objet theme ainsi qu'une fonction helper `themed` pour appliquer des styles en fonction du thème.
 * 
 * @example
 * const { theme, themed } = useAppTheme()
 * return <View style={themed($container)} />
 */
export const useAppTheme = () => {
    /**
     * Fonction permettant d'appliquer un style en fonction du thème.
     * @param themedStyle Le style qui peut être une fonction dépendante du thème ou un tableau de styles.
     * @returns Le style appliqué en fonction du thème actif.
     */
    const themed = <T,>(themedStyle: ThemedStyle<T> | ThemedStyleArray<T>): T | (T | undefined)[] => {
        if (typeof themedStyle === "function") {
            return themedStyle(theme)
        } else if (Array.isArray(themedStyle)) {
            return themedStyle.map((style) => {
                if (typeof style === "function") {
                    return style(theme)
                }
                return style
            })
        }
        return themedStyle as T
    }

    return { theme, themed }
}

// Exportation des éléments pour un accès facile depuis d'autres fichiers
export { colors }
export { spacing }
export { typography }
export { customFontsToLoad }
export { $styles }
