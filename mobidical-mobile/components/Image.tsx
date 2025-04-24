import React from 'react';
import { Image as RNImage, ImageProps} from 'react-native';
import { imagestyles } from './stylesComponents'

interface CustomImageProps extends ImageProps {
  rounded?: boolean;
}

export const Image = ({ rounded, style, ...props }: CustomImageProps) => {
  return (
    <RNImage
      style={[
        imagestyles.image,
        rounded && imagestyles.rounded,
        style,
      ]}
      {...props}
    />
  );
};

