import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/loginScreen";
import SignupScreen from "../screens/auth/signupScreen";
import ForgetPasswordScreen from "../screens/auth/forgetPassword";
import IntroScreen from "../screens/intro/introScreen";
import TabNavigator from "./tabNavigation";

// Création du Stack Navigator
const Stack = createStackNavigator();

export default function StackNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="Intro"
            screenOptions={{
                headerShown: false, // Cache l'en-tête par défaut pour tous les écrans
            }}
        >
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
    );
}
