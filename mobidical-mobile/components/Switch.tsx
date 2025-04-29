import { colors } from '@/theme';
import React from 'react';
import { Pressable,  Animated } from 'react-native';
import { Switchstyles }from './stylesComponents'
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
        Switchstyles.track,
        {
          backgroundColor: value ? colors.palette.liongreen :colors.palette.white
        },
        disabled && Switchstyles.disabled,
      ]}
      onPress={toggleSwitch}
    >
      <Animated.View
        style={[
          Switchstyles.thumb,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
};

