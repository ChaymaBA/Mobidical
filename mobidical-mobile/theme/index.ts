import { $styles } from "./styles"
import type { StyleProp } from "react-native"
import { colors } from "./colors"
import { images } from "./images"
import { spacing } from "./spacing"

/**
 * L'objet Theme contient toutes les informations nécessaires pour styliser l'application.
 */
export interface Theme {
    colors: typeof colors // Définition des couleurs utilisées dans l'application.
    spacing: typeof spacing // Définition des espacements pour les marges et les paddings.
    styles: typeof $styles // Styles globaux prédéfinis.
    images: typeof images // Images utilisées dans l'application.
}

/**
 * Définition du thème principal de l'application.
 */
export const theme: Theme = {
    colors, // Inclusion des couleurs définies dans colors.ts.
    spacing, // Inclusion des espacements définis dans spacing.ts.
    styles: $styles, // Inclusion des styles globaux.
    images, // Inclusion des images.
}

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
            return themedStyle.flatMap<T | readonly T[]>((style) => {
                if (style === null || style === undefined) return [] as T[];
                if (typeof style === "function") {
                    return [(style as ThemedStyle<T>)(theme)]
                } else if (Array.isArray(style)) {
                    return style.map((nestedStyle) => {
                        if (typeof nestedStyle === "function") {
                            return (nestedStyle as ThemedStyle<T>)(theme)
                        }
                        return nestedStyle
                    }).filter((nestedStyle): nestedStyle is T => nestedStyle !== null && nestedStyle !== undefined)
                }
                return [style] as T[]
            }).filter((style): style is T => style !== null && style !== undefined)
        }
        return themedStyle as T
    }

    return { theme, themed }
}

// Exportation des éléments pour un accès facile depuis d'autres fichiers
export { colors }
export { spacing }
export { $styles }
export { images }