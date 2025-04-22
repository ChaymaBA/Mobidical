import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/theme/colors';
import { palette } from '@/theme';
import theme from '@/theme/useTheme';
import { Darkpalette } from '@/theme/colorsDark'; 
import useTheme from '@/theme/useTheme';  
import { ThemeType } from '@/theme/type';

const { height, width } = Dimensions.get('window');

 export const RequimentScreenstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.palette.white,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
        color: colors.palette.text100,
    },
    link: {
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
        marginBottom: 8,
    },
  
         safeArea: {
             flex: 1,
             backgroundColor: colors.palette.white},
       
         headerContainer: {
             flexDirection: 'row',
             alignItems: 'center',
             marginBottom: 20,
         },
         backButton: {
             marginRight: 15,
         },
         appName: {
             fontSize: 24,
             fontWeight: 'bold',
             color: colors.palette.text100,
             flex: 1,
             textAlign: 'center',
         },
        logo: {
             width: 40,
             height: 40,
     },
     });


 

export const editChildInfoStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0,
        borderBottomColor: colors.palette.overlay50,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.palette.black,
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: colors.palette.black,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: '500',
        color: colors.palette.black,
    },
    inputField: {
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: colors.palette.white,
        shadowColor: colors.palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: colors.palette.black,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        marginBottom: 10,
        color: colors.palette.lionRed,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: colors.palette.text100,
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Styles spécifiques à l'écran d'édition des informations de l'enfant
    datePicker: {
        borderRadius: 8,
        backgroundColor: colors.palette.white,
        shadowColor: colors.palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    genderContainer: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    noteText: {
        fontSize: 12,
        marginTop: 5,
        color: colors.palette.text200,
    },
    iconBackgroundStyle: {
        backgroundColor: colors.palette.white
    },
});

// Styles dynamiques via le hook useTheme

 export const ColorPikerstyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.palette.white,
        borderRadius: 8
    },
    wheel: {
        width: 256,
        height: 256,
        borderRadius: 128,
        marginBottom: 24,
        position: 'relative'
    },
    wheelOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 128,
        backgroundColor: colors.palette.white
    },
     safeArea: {
         flex: 1,
         backgroundColor: colors.background,
     },
     
     headerContainer: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         marginBottom: 20,
     },
     backButton: {
         padding: 8,},

         appName: {
             fontSize: 24,
             fontWeight: 'bold',
             color: colors.palette.black,
             flex: 1,
             textAlign: 'center',
         },
         logo: {
             width: 40,
             height: 40,
             
         },
     content: {
         flex: 1,
         alignItems: 'center',
     },
    marker: {
        position: 'absolute',
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.palette.white
    },
    slider: {
        width: 256,
        height: 24,
        borderRadius: 12,
        position: 'relative'
    },
    sliderThumb: {
        position: 'absolute',
        width: 16,
        height: 32,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.palette.white,
        borderRadius: 8,
        top: '50%'
    },
    colorPreview: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginRight: 16
    },
    hexInput: {
        padding: 8,
        borderWidth: 1,
        borderColor: colors.palette.white,
        borderRadius: 4
    },
     button: {
         borderRadius: 8,
         paddingVertical: 12,
         marginTop: 20,
         marginBottom: 30,
         backgroundColor: colors.palette.black, 
        },

     colorPreviewContainer: {
         flexDirection: 'row',
         alignItems: 'center',
         marginTop: 24,
     },
});
// Update the PreferencesScreen styles to include the new properties
export const getPreferencesScreenStyles = (theme: ThemeType) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.background
    },
    container: {
        flex: 1,
        padding: 20
    },
    formContainer: {
        flex: 1,
        paddingBottom: 20
    },
    section: {
        marginBottom: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    backButton: {
        padding: 8
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.textPrimary
    },
    logo: {
        width: 40,
        height: 40, 
        color:theme.iconColor,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: theme.textPrimary
    },
    checkboxContainer: {
        marginBottom: 20
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: theme.primary,
        marginRight: 10
    },
    checkboxSelected: {
        backgroundColor: theme.primary
    },
    checkboxLabel: {
        fontSize: 16,
        color: theme.textPrimary
    },
    button: {
        backgroundColor: theme.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: colors.palette.text200,
        fontSize: 16,
        fontWeight: 'bold'
    },
    // Add these new styles needed by the ColorSelector component
    colorPickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: theme.card,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: theme.border,
    },
    colorPickerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorPreview: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: theme.border,
    },
    colorPickerText: {
        fontSize: 16,
        color: theme.textPrimary,
        fontWeight: '500',
    },
    switch:{
        marginTop: 8,
        marginBottom: 8,
    },
    favoriteActivitiesContainer: {
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
  
    },
});
export const getAboutScreenStyles = (theme: ThemeType) =>
    StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: theme.background,
        },
        container: {
            padding: 20,
            paddingBottom: 40,
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
        },
        backButton: {
            marginRight: 10,
        },
        headerText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.primary,
        },
        logoContainer: {
            alignItems: 'center',
            marginVertical: 20,
        },
        logo: {
            width: 80,
            height: 80,
            marginBottom: 10,
            resizeMode: 'contain',
            color: theme.iconColor,
        },
        appName: {
            fontSize: 22,
            fontWeight: '600',
            color: theme.primary,
        },
        versionText: {
            fontSize: 14,
            color: theme.textSecondary,
            marginTop: 4,
        },
        section: {
            marginTop: 20,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.primary,
            marginBottom: 6,
        },
        sectionText: {
            fontSize: 14,
            color: theme.primary,
            lineHeight: 20,
        },
    });


export const ProfressionChildScreenStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 100,
        backgroundColor: theme.background,
    },
    safeArea: {
        flex: 1,
        backgroundColor: theme.background,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: theme.primary,
    },
    section: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: theme.card,
        borderRadius: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: theme.textPrimary,
    },
    dropdown: {
        borderColor: theme.border,
        borderRadius: 8,
        backgroundColor: theme.card,
    },
    errorText: {
        color: theme.error,
        fontSize: 13,
        marginTop: 4,
    },
    inputWithReducedSpace: {
        marginBottom: 10,
    },
    bottomButtonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.background,
        borderTopWidth: 1,
        borderTopColor: theme.border,
    },
    button: {
        backgroundColor: theme.primary,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    appNameStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.primary,
    },
});
// stylesS.js


// stylesS.ts



export const makeStyles = (theme:ThemeType) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: theme.background,
        },
        container: {
            paddingHorizontal: 20,
        },
        safeArea: {
            flex: 1,
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        backButton: {
            padding: 10,
        },
        appNameStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.textPrimary,
        },
        logo: {
            width: 40,
            height: 40,
            resizeMode: 'contain',
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 20,
            color: theme.textPrimary,
        },
        section: {
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 10,
            color: theme.textPrimary,
        },
        dropdown: {
            backgroundColor: theme.background,
            borderWidth: 0,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
        },
        dropdownContainer: {
            borderWidth: 0,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        },
        dropdownOuterContainer: {
            marginBottom: 15,
        },
        dropdownText: {
            color: theme.textPrimary,
        },
        datePicker: {
            backgroundColor: theme.background,
            borderWidth: 0,
            shadowColor: theme.textPrimary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
            color: theme.textPrimary,
            marginBottom: 15,
        },
        observationInput: {
            backgroundColor: theme.background,
            borderWidth: 0,
            borderRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
            color: theme.textPrimary,
            padding: 15,
        },
        errorText: {
            color: theme.error,
            fontSize: 13,
            marginTop: 5,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            fontSize: 16,
            backgroundColor: '#fff',
        },
        midButtonContainer:{

        },
        button: {
            backgroundColor: theme.textPrimary,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
        },
        buttonDisabled: {
            opacity: 0.7,
        },
        buttonText: {
            color: theme.background,
            fontSize: 16,
            fontWeight: 'bold',
        },
        textInput: {
            backgroundColor: theme.background,
            color: theme.textPrimary,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            textAlignVertical: 'top',
            minHeight: 100,
},
    });

export const FeedBackScreenstyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.background,
    },
    inputField: {
        backgroundColor: theme.background,
        color: theme.textPrimary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
        minHeight: 100,
    },
    safeArea: {
        flex: 1,
        paddingTop: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.textPrimary,
        flex: 1,
        textAlign: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.textPrimary,
        marginVertical: 20,
    },
    starRatingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    ratingText: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20,
        color: theme.textPrimary,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.textPrimary,
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: theme.background,
    },
    // Nouveau conteneur pour le bouton au milieu
    midButtonContainer: {
        marginVertical: 30,
        paddingHorizontal: 10,
    },
    submitButtonText: {
        color: theme.primary,
        fontSize: 18,
    },
    button: {
        backgroundColor: theme.textPrimary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: theme.background,
        fontSize: 16,
        fontWeight: 'bold',
    },
});