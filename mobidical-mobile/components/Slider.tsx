import React from 'react';
import { colors } from '@/theme';

import { View, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SliderProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}

export const Slider = ({
  min = 0,
  max = 100,
  value,
  onChange,
}: SliderProps) => {
  const position = useSharedValue(0);
  const width = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const newPosition = Math.max(0, Math.min(width.value, e.absoluteX));
      position.value = withSpring(newPosition);
      const percentage = (newPosition / width.value) * 100;
      const newValue = min + (percentage / 100) * (max - min);
      onChange(Math.round(newValue));
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <View style={styles.track} />
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: colors.palette.white,
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: colors.palette.lionBook,
    borderRadius: 10,
    elevation: 3,
    shadowColor: colors.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});