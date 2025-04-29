import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { useForm } from 'react-hook-form';
import { loginScreenStyles } from '@/utils/styles';
import { images } from '@/theme/images';
import { colors } from '@/theme/colors';
import { validateEmail, validatePassword } from '@/utils/validation';
import { observer } from 'mobx-react-lite';
import { useAuth } from '@/navigation/AuthContext';

const LoginScreen = observer(() => {
  const [rememberMe, setRememberMe] = useState(true);
  const passwordInputRef = useRef<any>(null);
  const { signIn } = useAuth(); // ✅ Utilisation du hook de contexte

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await signIn(data.email, data.password);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <ImageBackground
      source={images.home}
      style={loginScreenStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={loginScreenStyles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
                  name="email"
                  control={control}
                  leftIcon="mail"
                  returnKeyType="next"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  placeholderTextColor={colors.palette.text100}
                  rules={{
                    required: 'Email is required',
                    validate: validateEmail,
                  }}
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
              </View>

              {/* Password Field */}
              <View style={loginScreenStyles.inputContainer}>
                <Text style={loginScreenStyles.label}>Password</Text>
                <TextInput
                  name="password"
                  ref={passwordInputRef}
                  control={control}
                  leftIcon="lock-closed"
                  isPassword={true}
                  returnKeyType="done"
                  placeholder="Enter your password"
                  placeholderTextColor={colors.palette.text100}
                  rules={{
                    required: 'Password is required',
                    validate: validatePassword,
                  }}
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              </View>

              <Button
                title="Sign In"
                onPress={handleSubmit(onSubmit)}
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
});

export default LoginScreen;
