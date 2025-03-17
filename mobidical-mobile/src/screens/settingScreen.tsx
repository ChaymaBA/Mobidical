import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"

import { NavigationProp } from '@react-navigation/native';

const SettingScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings Screen</Text>
            <Button title="Change Password" onPress={() => navigation.navigate("ForgetPassword")} />
            <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
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

export default SettingScreen