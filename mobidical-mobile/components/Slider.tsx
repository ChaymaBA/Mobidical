import React from 'react';
import { Sliderstyles }from './stylesComponents'
import { View } from 'react-native';
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
      <View style={Sliderstyles.container}>
        <View style={Sliderstyles.track} />
        <Animated.View style={[Sliderstyles.thumb, thumbStyle]} />
      </View>
    </GestureDetector>
  );
};

