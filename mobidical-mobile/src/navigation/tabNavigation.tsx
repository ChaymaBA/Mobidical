import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import CommunicationScreen from "../screens/tab/commincationScreen";
import IntroScreen from "../screens/intro/introScreen";
import MotoSkillsScreen from "../screens/tab/motoSkils";
import GamesScreen from "../screens/tab/GamesScreen";

// Create Tab Navigator
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#3388C9", // Active tab color
                    tabBarInactiveTintColor: "#DCC48E", // Inactive tabs color
                    headerShown: false, // Hide headers at the top of the screen
                }}
            >
                <Tab.Screen name="Communication" component={CommunicationScreen} options={{ tabBarLabel: "Communication" }} />
                <Tab.Screen name="Interaction" component={IntroScreen} options={{ tabBarLabel: "Interaction" }} />
                <Tab.Screen name="MotoSkills" component={MotoSkillsScreen} options={{ tabBarLabel: "MotoSkills" }} />
                <Tab.Screen name="Games" component={GamesScreen} options={{ tabBarLabel: "Games" }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
