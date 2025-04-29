import React from 'react';
import {
    TouchableOpacity,
    Text,
    ViewStyle,
    TextStyle,
    GestureResponderEvent,
} from 'react-native';
import { buotonstyles } from './stylesComponents'

// Types de variantes de bouton
type ButtonVariant = 'primary' | 'secondary' | 'outline';
// Tailles possibles
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    style,
    textStyle,
}: ButtonProps) => {
    /**
     * Style spécifique selon la variante de bouton
     */
    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'secondary':
                return buotonstyles.secondary;
            case 'outline':
                return buotonstyles.outline;
            default:
                return buotonstyles.primary;
        }
    };

    /**
     * Style spécifique selon la taille
     */
    const getSizeStyle = (): ViewStyle => {
        switch (size) {
            case 'small':
                return buotonstyles.small;
            case 'large':
                return buotonstyles.large;
            default:
                return buotonstyles.medium;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                buotonstyles.buttonBase,
                getVariantStyle(),
                getSizeStyle(),
                disabled && buotonstyles.disabled,
                style, // styles personnalisés en prop
            ]}
        >
            <Text
                style={[
                    buotonstyles.textBase,
                    variant === 'outline' && buotonstyles.outlineText,
                    disabled && buotonstyles.disabledText,
                    textStyle, // styles texte personnalisés
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

