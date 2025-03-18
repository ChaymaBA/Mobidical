import { AuthProvider } from '@/navigation/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <Slot />
        <StatusBar style="auto" />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});