import { AuthProvider, useAuth } from '@/navigation/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigation() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only navigate after the component is mounted
    if (isAuthenticated !== undefined) {
      // Use a slight delay to ensure component is fully mounted
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
      <Slot />
      {loading && (
        <View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </>
  );
}