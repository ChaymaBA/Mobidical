import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import {colors } from'@/theme/colors';
interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.headerText}>
          {value || placeholder}
        </Text>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <Text style={[
                styles.optionText,
                option === value && styles.selectedOption
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.palette.white ,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 16,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.palette.white,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    color: colors.palette.lionBook,
    fontWeight: 'bold',
  },
});