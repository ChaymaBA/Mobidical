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
import axios from 'axios'; 
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

const API_URL = 'http://192.168.1.19:3000/api/auth/login';
const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const LoginScreen = observer(() => {
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<any>(null);
  const { signIn } = useAuth();

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
      setIsLoading(true);

      // Appel API avec axios
      const response = await authAPI.post('/auth/login', {
        email: data.email,
        password: data.password
      });

      // Vérifier si la réponse contient les données nécessaires
      if (response.data && response.data.token) {
        // Vous pouvez stocker le token ici si nécessaire

        // Utilisation du contexte d'authentification pour finaliser la connexion
        await signIn(data.email, data.password);

        // Afficher un message de succès si nécessaire
        // Alert.alert('Success', 'You are now logged in');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      // Gestion avancée des erreurs
      let errorMessage = 'Something went wrong';

      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un code d'état en dehors de la plage 2xx
        errorMessage = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        // Une erreur s'est produite lors de la configuration de la requête
        errorMessage = error.message || 'Authentication failed';
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
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
                title={isLoading ? "Signing In..." : "Sign In"}
                onPress={handleSubmit(onSubmit)}
                style={loginScreenStyles.button}
                disabled={isLoading}
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
