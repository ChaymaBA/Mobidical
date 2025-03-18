import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      await signUp(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h1" style={styles.title}>Create Account</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleRegister} style={styles.button} />
      <Link href="/login" style={styles.link}>
        <Text>Already have an account? Sign In</Text>
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
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
});