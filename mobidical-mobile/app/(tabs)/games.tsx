import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/CustomText';
import useTheme from '@/theme/useTheme';

const Games = () => {
  // Récupération du thème actuel
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text variant="h1" style={{ color: theme.textPrimary }}>Games</Text>
      <Text style={{ color: theme.textSecondary }}>Explore interactive games!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Games;