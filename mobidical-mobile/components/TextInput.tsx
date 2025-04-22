import React, { useState, forwardRef } from 'react';
import { TextInput as RNTextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity, ReturnKeyTypeOptions, KeyboardTypeOptions, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { colors } from '@/theme/colors';


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
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View style={[
            styles.inputContainer,
            isFocused && styles.focusedContainer
          ]}>
            {leftIcon && (
              <View style={styles.leftIconContainer}>
                <Ionicons
                  name={leftIcon}
                  size={20}
                  color="#333"
                  backgroundColor={colors.palette.white}
                />
              </View>
            )}
            <RNTextInput
              ref={ref}
              style={[
                styles.input,
                leftIcon && styles.inputWithLeftIcon,
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
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIconContainer}>
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color=  '#333'
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }

    // Si control et name sont fournis, on utilise Controller de react-hook-form
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <View style={[
                styles.inputContainer,
                isFocused && styles.focusedContainer,
                error && styles.errorContainer
              ]}>
                {leftIcon && (
                  <View style={styles.leftIconContainer}>
                    <Ionicons
                      name={leftIcon}
                      size={20}
                      color="#333"
         
                    />
                  </View>
                )}
                <RNTextInput
                  ref={ref}
                  style={[
                    styles.input,
                    leftIcon && styles.inputWithLeftIcon,
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
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIconContainer}>
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#333"
                    />
                  </TouchableOpacity>
                )}
              </View>

              {/* Message d'erreur placé en dehors du inputContainer */}
              {error && <Text style={styles.errorText}>{error.message}</Text>}
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
          <View style={styles.inputWrapper}>
            {leftIcon && (
              <Ionicons name={leftIcon} size={20} style={stylesRegister.icon} />
            )}
            <RNTextInput
              placeholder={placeholder}
              secureTextEntry={isPassword && !showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, style]}
              {...rest}
            />
            {isPassword && (
              <View style={stylesRegister.eyeIconWrapper}>
                {showPassword ? (
                  <Ionicons name="eye-off-outline" size={20} onPress={() => setShowPassword(false)} />
                ) : (
                  <Ionicons name="eye-outline" size={20} onPress={() => setShowPassword(true)} />
                )}
              </View>
            )}
          </View>
          {error && <Text style={stylesRegister.error}>{error.message}</Text>}
        </>
      )}
    />
  );
};

const stylesRegister = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.palette.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.palette.white,
  },
  icon: {
    marginRight: 8,
    color: colors.palette.text100,
  },
  input: {
    flex: 1,
    height: 45,
    color: colors.palette.black ,
  },
  eyeIconWrapper: {
    marginLeft: 8,
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.palette.overlay50,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.palette.text100,
    borderRadius: 8,
    width: '100%',
  },
  focusedContainer: {
    borderColor:  colors.palette.black,
  },
  errorContainer: {
    borderColor: colors.palette.lionRed,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 8, // Moins de padding à gauche quand il y a une icône
  },
  errorText: {
    color: colors.palette.lionRed,
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },
  leftIconContainer: {
    paddingHorizontal: 12,
  },
  rightIconContainer: {
    paddingHorizontal: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.palette.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.palette.white,
  },
});