import React, { useRef, useState } from 'react';
import { View, ImageBackground, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { registerScreenStyles } from '@/utils/styles';
import { images } from '@/theme/images';
import { palette, colors } from '@/theme/colors';
import { RadioButton } from '@/components/RadioButton';
import { validateEmail, validatePassword } from '@/utils/validation';

// Define form input types
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

  // Options pour le bouton radio
  const userTypeOptions = ['Educator', 'Parent', 'Therapist'];

  // Set up React Hook Form
  const { control, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: ''
    }
  });

  // Watch the password field value for confirm password validation
  const watchPassword = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    setLoading(true);
    try {
      // SignUp logic, en incluant le type d'utilisateur et autres informations
      await signUp(data.email, data.password, data.firstName, data.lastName, data.userType);
      router.replace('/(tabs)'); // Redirige vers la page après inscription réussie
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={images.home} style={registerScreenStyles.backgroundImage}>
      <SafeAreaView style={registerScreenStyles.safeArea}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={registerScreenStyles.header}>
            <Text style={registerScreenStyles.appName}>MOBIDICAL</Text>
            <Image source={images.app_logo} style={registerScreenStyles.logo} />
          </View>

          <Text variant="h1" style={registerScreenStyles.title}>Create Account</Text>

          {error ? <Text style={registerScreenStyles.errorText}>{error}</Text> : null}

          {/* First Name */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>First Name</Text>
            <TextInput
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              style={registerScreenStyles.inputField}
              placeholder="Enter your first name"
              placeholderTextColor={colors.palette.text100}
            />
          </View>

          {/* Last Name */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Last Name</Text>
            <TextInput
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              style={registerScreenStyles.inputField}
              placeholder="Enter your last name"
              placeholderTextColor={colors.palette.text100}
            />
          </View>

          {/* Email */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Email</Text>
            <TextInput
              name='email'
              control={control}
              leftIcon='mail'
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your email"
              placeholderTextColor={colors.palette.text100}
              rules={{
                required: 'Email is required',
                validate: validateEmail
              }}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
          </View>

          {/* Password */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Password</Text>
            <TextInput
              name='password'
              ref={passwordInputRef}
              control={control}
              leftIcon='lock-closed'
              isPassword={true}
              returnKeyType="done"
              placeholder="Enter your password"
              placeholderTextColor={colors.palette.text100}
              rules={{
                required: 'Password is required',
                validate: validatePassword
              }}
            />
          </View>

          {/* Confirm Password */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Confirm Password</Text>
            <TextInput
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watchPassword || 'Passwords do not match',
              }}
              isPassword={true}
              placeholder="Confirm your password"
              placeholderTextColor={colors.palette.text100}
              leftIcon="lock-closed"
            />
          </View>

          {/* User Type Selection */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Select User Type</Text>
            <Controller
              control={control}
              name="userType"
              rules={{ required: 'Please select a user type' }}
              render={({ field: { onChange, value } }) => (
                <RadioButton options={userTypeOptions} value={value} onChange={onChange} disabled={loading} />
              )}
            />
            {errors.userType && <Text style={registerScreenStyles.errorText}>{errors.userType.message}</Text>}
          </View>

          <Button
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={handleSubmit(onSubmit)}
            style={registerScreenStyles.button}
            disabled={loading}
          />

          {/* Maintenu le composant Link pour redirection vers login */}
          <Link href="/login" style={registerScreenStyles.link}>
            <Text>Already have an account? Sign In</Text>
          </Link>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
