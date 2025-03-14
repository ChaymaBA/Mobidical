import { forwardRef, ReactElement, ReactNode, useCallback } from "react"
import { ScrollViewProps, SectionList, SectionListProps } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller" // Import manquant

type SectionType<ItemType> = {
    name: string // Nom de la section
    description: string // Description de la section
    data: ItemType[] // Données contenues dans cette section
}

type SectionListWithKeyboardAwareScrollViewProps<ItemType> = SectionListProps<ItemType> & {
    /* Fonction optionnelle pour personnaliser le composant de défilement */
    renderScrollComponent?: (props: ScrollViewProps) => ReactNode

    /* Offset supplémentaire entre le bas du TextInput et le haut du clavier */
    bottomOffset?: number

    /* Liste des sections à afficher */
    sections: SectionType<ItemType>[]

    /* Fonction pour rendre l'en-tête de chaque section */
    renderSectionHeader: ({ section }: { section: SectionType<ItemType> }) => React.ReactNode
}

/**
 * Composant SectionList qui prend en charge le défilement ajusté au clavier
 * grâce à KeyboardAwareScrollView.
 */
const SectionListWithKeyboardAwareScrollView = forwardRef(
    function SectionListWithKeyboardAwareScrollView<ItemType = any>(
        {
            renderScrollComponent, // Composant de défilement personnalisé (facultatif)
            bottomOffset = 0, // Valeur par défaut pour l'offset du clavier
            contentContainerStyle, // Style du conteneur
            ...props // Autres propriétés passées au composant
        }: SectionListWithKeyboardAwareScrollViewProps<ItemType>,
        ref: React.Ref<SectionList<ItemType>>,
    ): ReactElement {
        /**
         * Fonction de rendu par défaut du composant de défilement.
         * Utilise `KeyboardAwareScrollView` pour ajuster la vue lors de l'affichage du clavier.
         */
        const defaultRenderScrollComponent = useCallback(
            (scrollProps: ScrollViewProps) => (
                <KeyboardAwareScrollView
                    contentContainerStyle={contentContainerStyle}
                    bottomOffset={bottomOffset}
                    {...scrollProps}
                />
            ),
            [contentContainerStyle, bottomOffset], // Dépendances pour éviter un re-render inutile
        )

        return (
            <SectionList
                {...props}
                ref={ref} // Référence pour le composant SectionList
                renderScrollComponent={renderScrollComponent ?? defaultRenderScrollComponent}
            />
        )
    }
) as <ItemType = any>(
    props: SectionListWithKeyboardAwareScrollViewProps<ItemType> & {
        ref?: React.Ref<SectionList<ItemType>>
    }
) => ReactElement

export default SectionListWithKeyboardAwareScrollView
