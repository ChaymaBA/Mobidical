import React, { ReactNode } from 'react';
import { View,  ViewStyle, Platform } from 'react-native';

import { Cardstyles } from './stylesComponents'

interface CardProps {
  children: ReactNode;       
  style?: ViewStyle;         
  elevation?: number;        
}

export const Card = ({ children, style, elevation = 2 }: CardProps) => {
  return (
    <View
      style={[
        Cardstyles.card,
        Platform.OS === 'android' && { elevation }, 
        style,
      ]}
    >
      {children}
    </View>
  );
};

