import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return re.test(password);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
      );
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/home.png')} // Image de fond
      style={styles.background}
    >
      {/* En-tête avec le nom de l'application et le logo */}
      <View style={styles.header}>
        <Text style={styles.appName}>MOBIDICAL</Text>
        <Image source={require('@/assets/images/app_logo.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        {/* Titre de la page */}
        <Text variant="h1" style={styles.title}>Welcome Back</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

        <Button
          title={loading ? "Signing In..." : "Sign In"}
          onPress={handleLogin}
          style={styles.button}
          disabled={loading}
        />

        <Link href="/register" style={styles.link}>
          <Text>Don't have an account? Sign Up</Text>
        </Link>

        <Link href="/reset-password" style={styles.link}>
          <Text>Forgot password?</Text>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 50,
    width: '100%',
    flexDirection: 'row',
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
    width: '90%', // Ajustez la largeur selon vos besoins
    marginTop: 150, // Ajustez cette valeur pour éviter le chevauchement avec l'en-tête
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%', // Prend toute la largeur disponible
    marginBottom: 20, // Espacement entre les champs
  },
  button: {
    marginTop: 20,
    width: '100%', // Prend toute la largeur disponible
  },
  link: {
    marginTop: 20,
    textAlign: 'left', // Alignement des liens à gauche
  },
  errorText: {
    color: 'red',
    textAlign: 'left', // Alignement du texte d'erreur à gauche
    marginBottom: 10,
  },
});