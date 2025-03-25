import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { Eye, EyeOff } from 'lucide-react-native';
import { Screen } from '@/components/Screen';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

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

  const handleLogin = async () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}

    >
      <ImageBackground
        source={require('@/assets/images/home.png')}
        style={styles.background}
      >
        <View style={styles.header}>
          <Text style={styles.appName}>MOBIDICAL</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={require('@/assets/images/app_logo.png')}
            style={styles.centeredLogo}
          />

          <Text variant="h1" style={styles.title}>Welcome Back</Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[styles.input, emailError ? styles.inputError : {}]}
            />
            {emailError ? (
              <Text style={styles.validationError}>{emailError}</Text>
            ) : email && !emailError && (
              <Text style={styles.validationSuccess}>Email is valid</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                style={[styles.input, passwordError ? styles.inputError : {}]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={24} color="#666" />
                ) : (
                  <Eye size={24} color="#666" />
                )}
              </TouchableOpacity>
            </View>
            {passwordError ? (
              <Text style={styles.validationError}>Password needs: {passwordError}</Text>
            ) : password && !passwordError && (
              <Text style={styles.validationSuccess}>Password is strong</Text>
            )}
          </View>

          <Button
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            disabled={loading}
            style={styles.button}
          />

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => router.push('/register')} style={styles.link}>
              <Text>Create an account</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => router.push('/reset-password')}>
              <Text>Forgot password?</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 40,
    width: '100%',
    alignItems: 'center',
  },
  appName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 25,
    marginTop: 120,
    alignItems: 'center',
  },
  centeredLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 28,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  button: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 15,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  linksContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  link: {
    marginVertical: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  validationError: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 5,
  },
  validationSuccess: {
    color: 'green',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginTop: 5,
  },
});