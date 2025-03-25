import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { Eye, EyeOff } from 'lucide-react-native';

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

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (email.includes(' ')) return 'Remove spaces from email';
    if (!email.includes('@')) return 'Email must include @';

    const atIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1) return 'Add a period (.) after domain';

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Enter a valid email address';

    return '';
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('1 lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('1 uppercase letter');
    if (!/\d/.test(password)) errors.push('1 number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('1 special character');

    return errors.length > 0 ? errors.join(', ') : '';
  };

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
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.appName}>MOBIDICAL</Text>
          <Image
            source={require('../../assets/images/app_logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.container}>
          <Text variant="h1" style={styles.title}>Create Account</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={handleFirstNameChange}
              autoCapitalize="words"
              style={styles.inputField}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={handleLastNameChange}
              autoCapitalize="words"
              style={styles.inputField}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.inputField}
            />
            {emailError ? <Text style={styles.validationError}>{emailError}</Text> : null}
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry={!showPassword}
              style={styles.inputField}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
            {passwordError ? <Text style={styles.validationError}>Password needs: {passwordError}</Text> : null}
          </View>

          <View style={styles.passwordContainer}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              secureTextEntry={!showConfirmPassword}
              style={styles.inputField}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} color="#666" /> : <Eye size={20} color="#666" />}
            </TouchableOpacity>
            {confirmPasswordError ? <Text style={styles.validationError}>{confirmPasswordError}</Text> : null}
          </View>

          <Button
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={handleRegister}
            style={styles.button}
            disabled={loading}
          />

          <Link href="/login" style={styles.link}>
            <Text>Already have an account? Sign In</Text>
          </Link>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16,
    color: '#000', // Couleur du texte du label
    fontWeight: '500',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#000', // Bordure noire
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 15,
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 40,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000', // Bouton noir
    paddingVertical: 15,
    borderRadius: 8,
  },
  link: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 14,
  },
  validationError: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});