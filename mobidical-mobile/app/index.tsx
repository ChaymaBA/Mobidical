import React from 'react';
import { View, Text } from 'react-native';
import TabNavigation from '../src/navigation/tabNavigation'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>

      {/* Ajout d'un titre */}
      <Text style={{ fontSize: 20, marginBottom: 20 }}>MOBIDICAL</Text>
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
    </View> 
  );
}
