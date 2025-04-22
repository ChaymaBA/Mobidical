import React from 'react';
import { Tabs } from 'expo-router';
import {
  MessageCircle,
  Telescope,
  Gamepad2 as Gamepad,
  BrainCircuit,
  Settings,
  User,
} from 'lucide-react-native';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import { router } from 'expo-router';
import useTheme from '@/theme/useTheme';
import { colors } from '@/theme/colors';

export default function TabLayout() {
  const { theme, isDarkMode } = useTheme();

  // Détermination de la couleur des icônes
  const iconColor = isDarkMode ? colors.palette.white : colors.palette.text100;

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const handleProfilePress = () => {
    router.push('/profil');
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.png')}
      style={[styles.background, { backgroundColor: theme.background }]}
    >
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: theme.accent,
          headerStyle: {
            backgroundColor: theme.card, 
          },
          headerTintColor: theme.textPrimary,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopWidth: 0,
            borderTopColor: theme.separator,
          },
          tabBarInactiveTintColor: theme.textSecondary,
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <TouchableOpacity
                onPress={handleProfilePress}
                style={{ marginRight: 20 }}
              >
                <User size={24} color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettingsPress}>
                <Settings size={24} color={iconColor} />
              </TouchableOpacity>
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Communication',
            tabBarIcon: ({ color, size }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="interaction"
          options={{
            title: 'Interaction',
            tabBarIcon: ({ color, size }) => (
              <Telescope size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="games"
          options={{
            title: 'Games',
            tabBarIcon: ({ color, size }) => (
              <Gamepad size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="moto_skills"
          options={{
            title: 'Moto Skills',
            tabBarIcon: ({ color, size }) => (
              <BrainCircuit size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});
