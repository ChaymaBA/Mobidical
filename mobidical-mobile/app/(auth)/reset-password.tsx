import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
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
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});