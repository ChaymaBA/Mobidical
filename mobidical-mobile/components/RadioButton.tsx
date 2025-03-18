import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RadioButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const RadioButton = ({
  options,
  value,
  onChange,
  disabled = false,
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
          <View style={[
            styles.radio,
            disabled && styles.disabled,
            value === option && styles.selected,
          ]}>
            {value === option && <View style={styles.dot} />}
          </View>
          <Text style={[
            styles.label,
            disabled && styles.disabledText,
          ]}>
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
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: '#007AFF',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  label: {
    fontSize: 16,
  },
  disabled: {
    borderColor: '#999',
    backgroundColor: '#f5f5f5',
  },
  disabledText: {
    color: '#999',
  },
});