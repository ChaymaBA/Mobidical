import React from 'react';
import { View, StyleSheet } from 'react-native';
import {colors} from '@/theme/colors'

interface ProgressProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
}

export const Progress = ({
  progress,
  color = colors.palette.lionBook,
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
    backgroundColor: colors.palette.white,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});