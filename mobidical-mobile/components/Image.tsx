import React from 'react';
import { Image as RNImage, ImageProps, StyleSheet } from 'react-native';

interface CustomImageProps extends ImageProps {
  rounded?: boolean;
}

export const Image = ({ rounded, style, ...props }: CustomImageProps) => {
  return (
    <RNImage
      style={[
        styles.image,
        rounded && styles.rounded,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  rounded: {
    borderRadius: 12,
  },
});