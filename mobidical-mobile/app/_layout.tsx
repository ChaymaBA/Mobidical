import { AuthProvider, useAuth } from '@/navigation/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import useTheme from '@/theme/useTheme';
import '@/i18n';
import { $styles } from '@/theme/styles';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={$styles.flex1}>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigation() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();

  // Handle navigation based on authentication and kids info status
  useEffect(() => {
        if (isAuthenticated) {
          console.log(isAuthenticated)
          // User is authenticated
            router.replace('/(tabs)');
        } else {
          // User is not authenticated, show login first
          router.replace('/(auth)/login');
        }    
  }, [isAuthenticated]);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background
          }
        }}
      />

    </>
  );
}