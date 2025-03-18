import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
}

export const Progress = ({
  progress,
  color = '#007AFF',
  height = 8,
}: ProgressProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, { height }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});