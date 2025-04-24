import React, { useState, forwardRef } from 'react';
import { TextInput as RNTextInput, View, Text, TextInputProps, TouchableOpacity, ReturnKeyTypeOptions, KeyboardTypeOptions, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, Control } from 'react-hook-form';
import { colors } from '@/theme/colors';
import { TextInputstyle } from './stylesComponents'


interface CustomTextInputProps extends TextInputProps {
  label?: string;
  isPassword?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  control?: Control<any>;
  name?: string;
  rules?: object;
  returnKeyType?: ReturnKeyTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  placeholderTextColor?: string;
  iconbackgroundColor?: ViewStyle;
  onSubmitEditing?: () => void;
}

export const TextInput = forwardRef<RNTextInput, CustomTextInputProps>(
  ({ label, style, isPassword = false, leftIcon, control, name, rules, returnKeyType, autoCapitalize, keyboardType, placeholder, placeholderTextColor, onSubmitEditing, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    // Si pas de control ou name, on rend l'input directement
    if (!control || !name) {
      return (
        <View style={TextInputstyle.container}>
          {label && <Text style={TextInputstyle.label}>{label}</Text>}
          <View style={[
            TextInputstyle.inputContainer,
            isFocused && TextInputstyle.focusedContainer
          ]}>
            {leftIcon && (
              <View style={TextInputstyle.leftIconContainer}>
                <Ionicons
                  name={leftIcon}
                  size={20}
                  color={colors.palette.text100}
                  backgroundColor={colors.palette.white}
                />
              </View>
            )}
            <RNTextInput
              ref={ref}
              style={[
                TextInputstyle.input,
                leftIcon && TextInputstyle.inputWithLeftIcon,
                style,
              ]}
              secureTextEntry={isPassword && !isPasswordVisible}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              returnKeyType={returnKeyType || 'default'}
              autoCapitalize={autoCapitalize || 'none'}
              keyboardType={keyboardType || 'default'}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor || colors.palette.text100}
              onSubmitEditing={onSubmitEditing}
              {...props}
            />
            {isPassword && (
              <TouchableOpacity onPress={togglePasswordVisibility} style={TextInputstyle.rightIconContainer}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.palette.text100}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    // Si control et name sont fournis, on utilise Controller de react-hook-form
    return (
      <View style={TextInputstyle.container}>
        {label && <Text style={TextInputstyle.label}>{label}</Text>}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <View style={[
                TextInputstyle.inputContainer,
                isFocused && TextInputstyle.focusedContainer,
                error && TextInputstyle.errorContainer
              ]}>
                {leftIcon && (
                  <View style={TextInputstyle.leftIconContainer}>
                    <Ionicons
                      name={leftIcon}
                      color={colors.palette.text100}
         
                    />
                  </View>
                )}
                <RNTextInput
                  ref={ref}
                  style={[
                    TextInputstyle.input,
                    leftIcon && TextInputstyle.inputWithLeftIcon,
                    style,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={isPassword && !isPasswordVisible}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                  }}
                  returnKeyType={returnKeyType || 'default'}
                  autoCapitalize={autoCapitalize || 'none'}
                  keyboardType={keyboardType || 'default'}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor || 'colors.palette.text200,'}
                  onSubmitEditing={onSubmitEditing}
                  {...props}
                />
                {isPassword && (
                  <TouchableOpacity onPress={togglePasswordVisibility} style={TextInputstyle.rightIconContainer}>
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.palette.text100}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Message d'erreur placé en dehors du inputContainer */}
              {error && <Text style={TextInputstyle.errorText}>{error.message}</Text>}
            </>
          )}
        />
      </View>
    );
  }
);
export const CustomTextInput = ({
  name,
  control,
  rules,
  placeholder,
  secureTextEntry,
  isPassword,
  leftIcon,
  style,
  ...rest
}: {
  name: string;
  control: Control<any>;
  rules?: object;
  placeholder?: string;
  secureTextEntry?: boolean;
  isPassword?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  style?: object;
  [key: string]: any;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <>
          <View style={TextInputstyle.inputWrapper}>
            {leftIcon && (
              <Ionicons name={leftIcon} size={20} style={TextInputstyle.icon} />
            )}
            <RNTextInput
              placeholder={placeholder}
              secureTextEntry={isPassword && !showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[TextInputstyle.input, style]}
              {...rest}
            />
            {isPassword && (
              <View style={TextInputstyle.eyeIconWrapper}>
                {showPassword ? (
                  <Ionicons name="eye-off-outline" size={20} onPress={() => setShowPassword(false)} />
                ) : (
                  <Ionicons name="eye-outline" size={20} onPress={() => setShowPassword(true)} />
                )}
              </View>
            )}
          </View>
          {error && <Text style={TextInputstyle.error}>{error.message}</Text>}
        </>
      )}
    />
  );
};

