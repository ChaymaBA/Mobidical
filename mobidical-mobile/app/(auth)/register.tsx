import React, { useState } from 'react';
import { View, ImageBackground, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { Eye, EyeOff } from 'lucide-react-native';
import { validateEmail, validatePassword } from '@/utils/validation';
import { registerScreenStyles } from '@/utils/styles';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validateConfirmPassword = (confirmPassword: string) => {
    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
    setError('');
  };

  const handleLastNameChange = (text: string) => {
    setLastName(text);
    setError('');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(validateEmail(text));
    setError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
    setError('');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(validateConfirmPassword(text));
    setError('');
  };

  const handleRegister = async () => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(confirmPassword);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    if (emailValidation || passwordValidation || confirmPasswordValidation || !firstName || !lastName) {
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/home.png')}
      style={registerScreenStyles.backgroundImage}
    >
      <SafeAreaView style={registerScreenStyles.safeArea}>
        <View style={registerScreenStyles.header}>
          <Text style={registerScreenStyles.appName}>MOBIDICAL</Text>
          <Image
            source={require('../../assets/images/app_logo.png')}
            style={registerScreenStyles.logo}
          />
        </View>

        <View style={registerScreenStyles.container}>
          <Text variant="h1" style={registerScreenStyles.title}>Create Account</Text>

          {error ? <Text style={registerScreenStyles.errorText}>{error}</Text> : null}

          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={handleFirstNameChange}
              autoCapitalize="words"
              style={registerScreenStyles.inputField}
            />
          </View>

          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={handleLastNameChange}
              autoCapitalize="words"
              style={registerScreenStyles.inputField}
            />
          </View>

          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              keyboardType="email-address"
              style={registerScreenStyles.inputField}
            />
            {emailError ? <Text style={registerScreenStyles.validationError}>{emailError}</Text> : null}
          </View>

          <View style={registerScreenStyles.passwordContainer}>
            <Text style={registerScreenStyles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              style={registerScreenStyles.inputField}
            />
            <TouchableOpacity
              style={registerScreenStyles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
            {passwordError ? <Text style={registerScreenStyles.validationError}>Password needs: {passwordError}</Text> : null}
          </View>

          <View style={registerScreenStyles.passwordContainer}>
            <Text style={registerScreenStyles.inputLabel}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
              style={registerScreenStyles.inputField}
            />
            <TouchableOpacity
              style={registerScreenStyles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
            {confirmPasswordError ? <Text style={registerScreenStyles.validationError}>{confirmPasswordError}</Text> : null}
          </View>

          <Button
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={handleRegister}
            style={registerScreenStyles.button}
            disabled={loading}
          />

          <Link href="/login" style={registerScreenStyles.link}>
            <Text>Already have an account? Sign In</Text>
          </Link>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}