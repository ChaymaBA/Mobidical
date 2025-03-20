import React, { useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground, Image, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (!email.includes('@') || !email.includes('.') || email.includes(' ')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUppercase || !hasLowercase || !hasNumber) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      setError('');
      setLoading(true);
      if (!validateInputs()) {
        setLoading(false);
        return;
      }
      await signUp(email, password, firstName, lastName);
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
        {/* Header avec logo et nom de l'application */}
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

          <TextInput
            label="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setError('');
            }}
            autoCapitalize="words"
          />

          <TextInput
            label="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              setError('');
            }}
            autoCapitalize="words"
          />

          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
          />

          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError('');
            }}
            secureTextEntry
          />

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
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
  },
  link: {
    alignItems: 'center',
    color:'#000000'
  
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
