import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      router.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/home.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <Text style={styles.appName}>MOBIDICAL</Text>
        <Image source={require('@/assets/images/app_logo.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        <Text variant="h1" style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          style={styles.button}
        />

        <Link href="/login" style={styles.link}>
          <Text>Back to Sign In</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
    right: 20,
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    marginTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000', // Bordure noire
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#000000', // Bouton noir
    borderRadius: 8,
    paddingVertical: 15,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});