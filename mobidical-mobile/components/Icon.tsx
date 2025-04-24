import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import { colors } from '@/theme';
import {iconstyle} from './stylesComponents'

interface IconProps {
  icon: React.ComponentType<LucideProps>; // Composant d'icône Lucide (ex: Bone, Barcode, etc.)
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Icon = ({
  icon: IconComponent,
  size = 24,
  color = colors.palette.text100,
  onPress,
  style,
}: IconProps) => {
  const iconElement = (
    <IconComponent size={size} color={color} style={style} />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} style={[iconstyle.container, style]}>
        {iconElement}
      </TouchableOpacity>
    );
  }

  return iconElement;
};

