import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"

import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}

const IntroScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the App!</Text>
            <Button title="Get Started" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
})

// Exportez le composant IntroScreen
export default IntroScreen