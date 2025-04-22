import { colors } from '@/theme';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  optionColor?: string; // ✅ Ajouté ici
}

export const RadioButton = ({
  options,
  value,
  onChange,
  disabled = false,
  optionColor = colors.palette.lionBook, // ✅ Couleur par défaut
}: RadioButtonProps) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.option}
          onPress={() => !disabled && onChange(option)}
          disabled={disabled}
        >
          <View
            style={[
              styles.radio,
              { borderColor: optionColor },
              disabled && styles.disabled,
              value === option && { borderColor: optionColor },
            ]}
          >
            {value === option && (
              <View style={[styles.dot, { backgroundColor: optionColor }]} />
            )}
          </View>
          <Text style={[styles.label, disabled && styles.disabledText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color:colors.palette.text100,
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    color: colors.palette.text100,
  },
});
