import { colors } from '@/theme';
import React from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch = ({
  value,
  onValueChange,
  disabled = false,
}: SwitchProps) => {
  const translateX = new Animated.Value(value ? 22 : 0);

  const toggleSwitch = () => {
    if (disabled) return;

    const newValue = !value;
    Animated.spring(translateX, {
      toValue: newValue ? 22 : 0,
      useNativeDriver: true,
    }).start();

    onValueChange(newValue);
  };

  return (
    <Pressable
      style={[
        styles.track,
        {
          backgroundColor: value ? colors.palette.liongreen :colors.palette.white
        },
        disabled && styles.disabled,
      ]}
      onPress={toggleSwitch}
    >
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: colors.palette.white,
    borderRadius: 12,
    shadowColor: colors.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabled: {
    opacity: 0.5,
  },
});