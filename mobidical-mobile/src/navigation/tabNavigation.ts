import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Importation des écrans
import CommunicationScreen from "../screens/CommunicationScreen";
import InteractionScreen from "../screens/InteractionScreen";
import MotoSkillsScreen from "../screens/MotoSkillsScreen";
import GamesScreen from "../screens/GamesScreen"; // Ensure this path is correct or update it to the correct path

import { colors } from "../theme";

// Création du Tab Navigator
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <NavigationContainer>
        <Tab.Navigator
        screenOptions= {({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap | undefined;

            // Définir les icônes pour chaque onglet
            switch (route.name) {
                case "Communication":
                    iconName = focused ? "chatbubbles" : "chatbubbles-outline";
                    break;
                case "Interaction":
                    iconName = focused ? "people" : "people-outline";
                    break;
                case "Moto Skills":
                    iconName = focused ? "bicycle" : "bicycle-outline";
                    break;
                case "Games":
                    iconName = focused ? "game-controller" : "game-controller-outline";
                    break;
            }

            return iconName ? <Ionicons name={ iconName } size = { size } color = { color } /> : null;
        },
        tabBarActiveTintColor: "#3388C9", // Couleur de l'onglet actif
            tabBarInactiveTintColor:"#DCC48E" , // Couleur des onglets inactifs
        headerShown: false, // Cache les headers en haut de l'écran
})}
  >
<Tab.Screen name="Communication" component={CommunicationScreen} />
<Tab.Screen name="Interaction" component={InteractionScreen} />
<Tab.Screen name="Moto Skills" component={MotoSkillsScreen} />
<Tab.Screen name="Games" component={GamesScreen} />
</Tab.Navigator>
</NavigationContainer>
    );
}
