import React, { useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { passwordScreenStyles } from '@/utils/styles';

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
      style={passwordScreenStyles.background}
    >
      <View style={passwordScreenStyles.header}>
        <Text style={passwordScreenStyles.appName}>MOBIDICAL</Text>
        <Image
          source={require('@/assets/images/app_logo.png')}
          style={passwordScreenStyles.logo}
        />
      </View>

      <View style={passwordScreenStyles.container}>
        <Text variant="h1" style={passwordScreenStyles.title}>Reset Password</Text>
        <Text style={passwordScreenStyles.description}>
          Enter your email address and we'll send you instructions to reset your password.
        </Text>

        <View style={passwordScreenStyles.inputContainer}>
          <Text style={passwordScreenStyles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={passwordScreenStyles.input}
          />
        </View>

        <Button
          title="Reset Password"
          onPress={handleResetPassword}
          style={passwordScreenStyles.button}
        />

        <Link href="/login" style={passwordScreenStyles.link}> 
          <Text>Back to Sign In</Text>
        </Link>
      </View>
    </ImageBackground>
  );
}