import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { passwordScreenStyles } from '@/utils/styles';
import { images } from '@/theme/images';
import { colors } from '@/theme/colors';
import { validateEmail } from '@/utils/validation';

const ResetPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const { control, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      await resetPassword(data.email);
      router.replace('/login');
    } catch (err: any) {
      console.error('Reset password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={images.forg}
      style={passwordScreenStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={passwordScreenStyles.safeArea}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with app name and logo */}
          <View style={passwordScreenStyles.header}>
            <Text style={passwordScreenStyles.appName}>MOBIDICAL</Text>
            <Image source={images.app_logo} style={passwordScreenStyles.logo} />
          </View>

          <View style={passwordScreenStyles.container}>
            <Text variant="h1" style={passwordScreenStyles.titleP}>Reset Password</Text>

            <Text style={passwordScreenStyles.description}>
              Enter your email address and we'll send you instructions to reset your password.
            </Text>

            {/* Email Field */}
            <View style={passwordScreenStyles.inputContainer}>
              <Text style={passwordScreenStyles.label}>Email</Text>
              <TextInput
                name="email"
                returnKeyType="done"
                autoCapitalize="none"
                keyboardType="email-address"
                style={passwordScreenStyles.input}
                control={control}
                rules={{
                  required: 'Email is required',
                  validate: validateEmail
                }}
                leftIcon="mail"
                placeholder="Enter your email"
                placeholderTextColor={colors.palette.text100}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            </View>

            <Button
              title={loading ? 'Sending...' : 'Reset Password'}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={passwordScreenStyles.button}
            />

            <TouchableOpacity
              onPress={() => router.push('/login')}
              accessibilityLabel="Back to Sign In"
              style={{ marginTop: 20, alignItems: 'center' }}
            >
              <Text style={passwordScreenStyles.link}>Back to Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ResetPasswordScreen;
