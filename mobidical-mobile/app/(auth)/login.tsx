import React, { useRef, useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '@/constants/formTypes';
import { loginScreenStyles } from '@/utils/styles';
import { images } from '@/theme/images'; 
import { colors } from '@/theme/colors';
import { validateEmail, validatePassword } from '@/utils/validation';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const { signIn } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={images.home}
      style={loginScreenStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={loginScreenStyles.safeArea}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginScreenStyles.header}>
            <Text style={loginScreenStyles.appName}>MOBIDICAL</Text>
          </View>

          <View style={loginScreenStyles.container}>
            <Image
              source={images.app_logo}
              style={loginScreenStyles.centeredLogo}
              resizeMode="contain"
            />
            <Text variant="h1" style={loginScreenStyles.title}>Welcome Back</Text>

            {/* Email Field */}
            <View style={loginScreenStyles.inputContainer}>
              <Text style={loginScreenStyles.label}>Email</Text>
              <TextInput
                name='email'
                control={control}
                leftIcon='mail'
                returnKeyType="next"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor={colors.palette.text100}
                rules={{
                  required: 'Email is required',
                  validate: validateEmail
                }}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              // Ne pas transmettre le style loginScreenStyles.input ici
              />
            </View>

            {/* Password Field */}
            <View style={loginScreenStyles.inputContainer}>
              <Text style={loginScreenStyles.label}>Password</Text>
              <TextInput
                name='password'
                ref={passwordInputRef}
                control={control}
                leftIcon='lock-closed'
                isPassword={true}
                returnKeyType="done"
                placeholder="Enter your password"
                placeholderTextColor={colors.palette.text100}
                rules={{
                  required: 'Password is required',
                  validate: validatePassword
                }}
                onSubmitEditing={handleSubmit(onSubmit)}
              // Ne pas transmettre le style loginScreenStyles.input ici
              />
            </View>

            <Button
              title={loading ? 'Signing In...' : 'Sign In'}
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
              style={loginScreenStyles.button}
            />

            <View style={loginScreenStyles.linksContainer}>
              <TouchableOpacity
                onPress={() => router.push('/register')}
                style={loginScreenStyles.link}
                accessibilityLabel="Create an account"
              >
                <Text style={loginScreenStyles.link}>Create an account</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/reset-password')}
                accessibilityLabel="Reset Password"
              >
                <Text style={loginScreenStyles.link}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;