import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';

import { AuthProvider, useAuth } from '@/navigation/AuthContext';
import useTheme from '@/theme/useTheme';
import { $styles } from '@/theme/styles';
import '@/i18n'; // Initialize internationalization

/**
 * RootLayout is the top-level component that wraps the entire app.
 * It sets up gesture handling and provides the authentication context.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={$styles.flex1}>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

/**
 * RootNavigation handles the main navigation logic of the app.
 * It redirects users to appropriate screens based on their authentication state
 * and applies the current theme to the entire stack.
 */
function RootNavigation() {
  const { isAuthenticated } = useAuth(); // Access auth state
  const { theme } = useTheme();          // Access current theme (light/dark)
  const router = useRouter();            // Get navigation router

  // Handle automatic redirection based on authentication status
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated:', isAuthenticated);
      router.replace('/(tabs)'); // Redirect to main app
    } else {
      router.replace('/(auth)/login'); // Redirect to login screen
    }
  }, [isAuthenticated]);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the default header for all screens
        contentStyle: {
          backgroundColor: theme.background, // Apply theme background color
        },
      }}
    />
  );
}
