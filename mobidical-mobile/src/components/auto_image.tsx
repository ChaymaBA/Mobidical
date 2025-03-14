import React from "react";
import { View, Image, StyleSheet } from "react-native";

const AppLogo = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("./assets/app_log.png")} // Chargez l'image depuis le dossier assets
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Permet à l'image de s'afficher sur tout l'écran
    },
    logo: {
        position: "absolute", // Position absolue pour placer l'image en haut à droite
        top: 20, // Distance du bord supérieur
        right: 20, // Distance du bord droit
        width: 100, // Taille de l'image
        height: 100, // Taille de l'image
    },
});

export default AppLogo;
