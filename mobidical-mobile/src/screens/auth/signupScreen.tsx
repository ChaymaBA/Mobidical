import React from "react"
import { View, Text, Button, TextInput, StyleSheet } from "react-native"

import { NavigationProp } from '@react-navigation/native';

const SignupScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Screen</Text>
            <TextInput placeholder="Email" style={styles.input} />
            <TextInput placeholder="Password" secureTextEntry style={styles.input} />
            <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />
            <Button title="Sign Up" onPress={() => navigation.navigate("Home")} />
            <Button title="Already have an account? Login" onPress={() => navigation.navigate("Login")} />
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

export default SignupScreen