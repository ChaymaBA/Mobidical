import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Bone as LucideIcon, Barcode as IconNode } from 'lucide-react-native';

interface IconProps {
  icon: IconNode;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Icon = ({ icon, size = 24, color = '#333', onPress, style }: IconProps) => {
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
        <LucideIcon iconNode={icon} size={size} color={color} />
      </TouchableOpacity>
    );
  }

  return (
    <LucideIcon iconNode={icon} size={size} color={color} style={style} />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});