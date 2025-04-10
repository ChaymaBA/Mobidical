import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
        onPress={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        {checked && <Check size={16} color="white" />}
      </TouchableOpacity>
      {label && (
        <Text style={[
          styles.label,
          disabled && styles.disabledText,
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
  },
  label: {
    fontSize: 16,
  },
  disabled: {
    borderColor: 'colors.palette.text200,',
    backgroundColor: '#f5f5f5',
  },
  disabledText: {
    color: 'colors.palette.text200,',
  },
});