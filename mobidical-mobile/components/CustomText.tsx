import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { CustomTextstyles } from './stylesComponents'

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: TextStyle;
}

export const Text = ({ children, variant = 'body', style }: TextProps) => {
  return (
    <RNText style={[CustomTextstyles[variant], style]}>
      {children}
    </RNText>
  );
};

