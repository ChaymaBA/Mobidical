import React from "react"
import { View, Text, Button, TextInput, StyleSheet } from "react-native"

import { NavigationProp } from '@react-navigation/native';

const ForgetPasswordScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password Screen</Text>
            <TextInput placeholder="Email" style={styles.input} />
            <Button title="Reset Password" onPress={() => navigation.navigate("Login")} />
            <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
})

export default ForgetPasswordScreen