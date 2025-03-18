import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: TextStyle;
}

export const Text = ({ children, variant = 'body', style }: TextProps) => {
  return (
    <RNText style={[styles[variant], style]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: '#666',
  },
});