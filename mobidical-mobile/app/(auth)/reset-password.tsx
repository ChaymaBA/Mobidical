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
      source={require('@/assets/images/home.png')} // Image de fond
      style={styles.background}
    >
      {/* En-tête avec le logo et le titre de l'application */}
      <View style={styles.header}>
        <Text style={styles.appName}>MOBIDICAL</Text>
        <Image source={require('@/assets/images/app_logo.png')} style={styles.logo} />
      </View>

      <View style={styles.container}>
        <Text variant="h1" style={styles.title}>Reset Password</Text>
        <Text style={styles.description}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Button title="Reset Password" onPress={handleResetPassword} style={styles.button} />
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
  button: {
    marginTop: 20,
    width: '100%',
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});