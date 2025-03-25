import { AuthProvider, useAuth } from '@/navigation/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { KeyboardProvider } from "react-native-keyboard-controller"

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigation() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setTimeout(() => {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
        setLoading(false);
      }, 100);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Stack screenOptions={{ gestureEnabled: true, headerShown: false }} />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </>
  );
}
