import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme/colors';
import { palette } from '@/theme';

 export const buotonstyles = StyleSheet.create({
    /**
     * Base du bouton : arrondi, centrage
     */
    buttonBase: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Style de fond selon la variante
    primary: {
        backgroundColor: colors.palette.lionBook,
    },
    secondary: {
        backgroundColor: colors.palette.owlBook,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.palette.lionBook,
    },

    // Padding selon la taille
    small: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    medium: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },

    // Opacité réduite si désactivé
    disabled: {
        opacity: 0.5,
    },

    /**
     * Texte par défaut
     */
    textBase: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },

    // Texte pour le bouton "outline"
    outlineText: {
        color: colors.palette.lionBook,
    },

    // Couleur de texte si désactivé
    disabledText: {
        color: colors.palette.text100,
    },
});
 export const Cardstyles = StyleSheet.create({
    card: {
        backgroundColor: colors.palette.white,
        borderRadius: 12,
        padding: 16,
        // Ombre pour iOS
        shadowColor: colors.palette.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
 export const dropdownstyles = StyleSheet.create({
    dropdown: {
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
    },
    dropdownContainer: {
        borderWidth: 0,
        elevation: 3,
        borderRadius: 12,
        marginTop: 4,
    },
});

 export const  checkboxstyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.palette.lionBook,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: colors.palette.lionBook,
    },
    label: {
        fontSize: 16,
    },
    disabled: {
        borderColor: colors.palette.text200,
        backgroundColor: colors.palette.white,
    },
    disabledText: {
        color: colors.palette.text200,
    },
});
export const CustomTextstyles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
    },
    caption: {
        fontSize: 14,
        color: colors.palette.text200,
    },
});
 export const iconstyle = StyleSheet.create({
    container: {
        padding: 8,
    },
});
export const imagestyles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    rounded: {
        borderRadius: 12,
    },
});
export const Modalstyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    languageItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.palette.white,
    },
    languageText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
export const PikeDatestyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        padding: 10,
        borderRadius: 8,
    },
    icon: {
        marginRight: 10,
    },
});
export const Progressstyles = StyleSheet.create({
    container: {
        backgroundColor: colors.palette.white,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
    },
});
export const RadioButtonstyles = StyleSheet.create({
    container: {
        gap: 12,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        color: colors.palette.text100,
    },
    disabled: {
        opacity: 0.6,
    },
    disabledText: {
        color: colors.palette.text100,
    },
});
export const Sheetstyles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 16,

    },
});
export const Sliderstyles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
    },
    track: {
        height: 4,
        backgroundColor: colors.palette.white,
        borderRadius: 2,
    },
    thumb: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: colors.palette.lionBook,
        borderRadius: 10,
        elevation: 3,
        shadowColor: colors.palette.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
export const Switchstyles = StyleSheet.create({
    track: {
        width: 50,
        height: 28,
        borderRadius: 14,
        padding: 2,
    },
    thumb: {
        width: 24,
        height: 24,
        backgroundColor: colors.palette.white,
        borderRadius: 12,
        shadowColor: colors.palette.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    disabled: {
        opacity: 0.5,
    },
});
 export const TextInputstyle = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.palette.white,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: colors.palette.white,
    },
    icon: {
        marginRight: 8,
        color: colors.palette.text100,
    },
    input: {
        flex: 1,
        height: 45,
        color: colors.palette.black,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    eyeIconWrapper: {
        marginLeft: 8,
    },
    error: {
        color: 'red',
        marginTop: 4,
        fontSize: 12,
    },
    container: {
        marginVertical: 12,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: colors.palette.overlay50,
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.palette.text100,
        borderRadius: 8,
        width: '100%',
    },
    focusedContainer: {
        borderColor: colors.palette.black,
    },
    errorContainer: {
        borderColor: colors.palette.lionRed,
    },

    inputWithLeftIcon: {
        paddingLeft: 8, // Moins de padding à gauche quand il y a une icône
    },
    errorText: {
        color: colors.palette.lionRed,
        fontSize: 14,
        marginTop: 6,
        marginLeft: 4,
    },
    leftIconContainer: {
        paddingHorizontal: 12,
    },
    rightIconContainer: {
        paddingHorizontal: 12,
    },
 });
 

