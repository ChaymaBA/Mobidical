import React from "react"
import { View, Text, Button, StyleSheet, SafeAreaView, Image, ImageBackground } from "react-native"
import { NavigationProp } from "@react-navigation/native";
const backgroundImage = require('../assets/images/background.png');
// Correction du chemin d'importation de l'icône
// Utilisation du require pour charger l'image locale
const AppIcon = require('../../assets/images/app_logo.png');

interface HomeScreenProps {
    navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <ImageBackground
            source={{ uri: 'background.png' }} // Temporaire, à remplacer par votre image
            style={styles.backgroundImage}
        >
            <SafeAreaView style={styles.container}>
                {/* Header avec le titre et l'icône */}
                <View style={styles.header}>
                    <View style={styles.headerLeft} />
                    <Text style={styles.appTitle}>MOBIDICAL</Text>
                    <View style={styles.headerRight}>
                        {/* Correction de la référence au style */}
                        <Image source={AppIcon} style={styles.appIcon} />
                    </View>
                </View>

                {/* Contenu principal */}
                <View style={styles.content}>
                    <Text style={styles.title}>Home Screen</Text>
                    <Button title="Go to Settings" onPress={() => navigation.navigate("Settings")} />
                    <Button title="Logout" onPress={() => navigation.navigate("Login")} />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fond semi-transparent pour améliorer la lisibilité
    },
    header: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        backgroundColor: "rgba(74, 144, 226, 0.9)", // Bleu semi-transparent
    },
    headerLeft: {
        width: 40,
    },
    appTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff", // Texte blanc
        textAlign: "center",
    },
    headerRight: {
        width: 40,
        alignItems: "flex-end",
    },
    appIconPlaceholder: {
        width: 30,
        height: 30,
        backgroundColor: "#fff", // Placeholder blanc pour l'icône
        borderRadius: 15,
    },
    appIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "#333", // Texte gris foncé
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
})

export default HomeScreen