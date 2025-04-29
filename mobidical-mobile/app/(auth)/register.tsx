import React, { useRef, useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Alert,
  TextStyle
} from 'react-native';
import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Importer le composant

import { useAuth } from '@/navigation/AuthContext';

import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';

import { registerScreenStyles } from '@/utils/styles';
import { validateEmail, validatePassword } from '@/utils/validation';
import { colors } from '@/theme/colors';
import { images } from '@/theme/images';
import { CustomDropDown } from '@/components/Dropdown';

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
};

export default function RegisterScreen() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const { signUp } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: ''
    },
    mode: 'onChange'
  });

  const watchPassword = watch('password');

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Educator', value: 'Educator' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Therapist', value: 'Therapist' }
  ]);

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      // Authentification Firebase
      await signUp(data.email, data.password, data.firstName, data.lastName, data.userType);

      Alert.alert(
        'Registration Successful',
        'Your account has been created successfully!',
        [{ text: 'OK', onPress: () => router.replace('/kids-info') }]
      );
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderErrorMessage = (errorMsg: any) => {
    const errorStyle: TextStyle = {
      ...registerScreenStyles.errorText as TextStyle,
      color: colors.palette.lionRed
    };

    if (typeof errorMsg === 'object' && errorMsg !== null && 'message' in errorMsg) {
      return <Text style={errorStyle}>{errorMsg.message}</Text>;
    }

    return <Text style={errorStyle}>{errorMsg}</Text>;
  };

  return (
    <ImageBackground source={images.home} style={registerScreenStyles.backgroundImage}>
      <SafeAreaView style={registerScreenStyles.safeArea}>
        {/* Utilisation de KeyboardAwareScrollView */}
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={registerScreenStyles.header}>
            <Text style={registerScreenStyles.appName}>MOBIDICAL</Text>
            <Image source={images.app_logo} style={registerScreenStyles.logo} />
          </View>

          <Text variant="h1" style={registerScreenStyles.titleR}>Create Account</Text>
          {error ? <Text style={registerScreenStyles.errorText as TextStyle}>{error}</Text> : null}

          {/* First Name */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>First Name</Text>
            <TextInput
              name="firstName"
              control={control}
              leftIcon="person"
              rules={{ required: 'First name is required' }}
              placeholder="Enter your first name"
              placeholderTextColor={colors.palette.text100}
            />
            {errors.firstName && renderErrorMessage(errors.firstName.message)}
          </View>

          {/* Last Name */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Last Name</Text>
            <TextInput
              name="lastName"
              control={control}
              leftIcon="person"
              rules={{ required: 'Last name is required' }}
              placeholder="Enter your last name"
              placeholderTextColor={colors.palette.text100}
            />
            {errors.lastName && renderErrorMessage(errors.lastName.message)}
          </View>

          {/* Email */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Email</Text>
            <TextInput
              name="email"
              control={control}
              leftIcon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor={colors.palette.text100}
              rules={{
                required: 'Email is required',
                validate: validateEmail
              }}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            {errors.email && renderErrorMessage(errors.email.message)}
          </View>

          {/* Password */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Password</Text>
            <TextInput
              name="password"
              ref={passwordInputRef}
              control={control}
              leftIcon="lock-closed"
              isPassword={true}
              placeholder="Enter your password"
              placeholderTextColor={colors.palette.text100}
              rules={{
                required: 'Password is required',
                validate: validatePassword
              }}
            />
            {errors.password && renderErrorMessage(errors.password.message)}
          </View>

          {/* Confirm Password */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Confirm Password</Text>
            <TextInput
              name="confirmPassword"
              control={control}
              isPassword={true}
              leftIcon="lock-closed"
              placeholder="Confirm your password"
              placeholderTextColor={colors.palette.text100}
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watchPassword || 'Passwords do not match'
              }}
            />
            {errors.confirmPassword && renderErrorMessage(errors.confirmPassword.message)}
          </View>

          {/* User Type Dropdown */}
          <View style={[registerScreenStyles.inputContainer, { zIndex: 1000 }]}>
            <Text style={registerScreenStyles.inputLabel}>Select User Type</Text>
            <Controller
              control={control}
              name="userType"
              rules={{ required: 'Please select a user type' }}
              render={({ field: { onChange, value } }) => (

                <CustomDropDown
                  open={open}
                  setOpen={setOpen}
                  value={value}
                  setValue={onChange}
                  items={items}
                  placeholderKey="select Progression"

                />
              )}
            />
            {errors.userType && renderErrorMessage(errors.userType.message)}
          </View>

          <Button
            title={loading ? 'Creating Account...' : 'Sign Up'}
            onPress={handleSubmit(onSubmit)}
            style={registerScreenStyles.button}
            disabled={loading}
          />

          <Link href="/login" style={registerScreenStyles.link}>
            <Text>Already have an account? Sign In</Text>
          </Link>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
