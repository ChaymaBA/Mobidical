import React from 'react';
import { View, } from 'react-native';
import {colors} from '@/theme/colors'

import { Progressstyles } from './stylesComponents'
interface ProgressProps {
  progress: number; 
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
    <View style={[Progressstyles.container, { height }]}>
      <View
        style={[
          Progressstyles.progress,
          {
            width: `${clampedProgress}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

