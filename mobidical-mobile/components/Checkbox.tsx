import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { checkboxstyles } from'./stylesComponents';
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
      style={checkboxstyles.container}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
    >
      <TouchableOpacity
        style={[
          checkboxstyles.checkbox,
          checked && checkboxstyles.checked,
          disabled && checkboxstyles.disabled,
        ]}
        onPress={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        {checked && <Check size={16} color="white" />}
      </TouchableOpacity>
      {label && (
        <Text style={[
          checkboxstyles.label,
          disabled && checkboxstyles.disabledText,
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
