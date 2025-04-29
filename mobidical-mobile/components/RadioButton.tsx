import { colors } from '@/theme';
import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { RadioButtonstyles }from './stylesComponents'

interface RadioButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  optionColor?: string; 
}

export const RadioButton = ({
  options,
  value,
  onChange,
  disabled = false,
  optionColor = colors.palette.lionBook, 
}: RadioButtonProps) => {
  return (
    <View style={RadioButtonstyles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={RadioButtonstyles.option}
          onPress={() => !disabled && onChange(option)}
          disabled={disabled}
        >
          <View
            style={[
              RadioButtonstyles.radio,
              { borderColor: optionColor },
              disabled && RadioButtonstyles.disabled,
              value === option && { borderColor: optionColor },
            ]}
          >
            {value === option && (
              <View style={[RadioButtonstyles.dot, { backgroundColor: optionColor }]} />
            )}
          </View>
          <Text style={[RadioButtonstyles.label, disabled && RadioButtonstyles.disabledText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

