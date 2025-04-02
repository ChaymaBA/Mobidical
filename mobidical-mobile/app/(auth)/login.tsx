import React, { useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { Eye, EyeOff } from 'lucide-react-native';
import { Screen } from '@/components/Screen';
import { validateEmail, validatePassword } from '@/utils/validation';
import { loginScreenStyles } from '@/utils/styles'; // Importer les styles

export default function LoginScreen() {
  // États pour gérer le formulaire de connexion
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Hook d'authentification
  const { signIn } = useAuth();

  // Gestion des changements d'email
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(validateEmail(text));
    setError('');
  };

  // Gestion des changements de mot de passe
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(validatePassword(text));
    setError('');
  };

  // Gestion de la connexion
  const handleLogin = async () => {
    // Validation avant la tentative de connexion
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    // Arrêter si des erreurs de validation existent
    if (emailErr || passwordErr) return;

    setLoading(true);
    try {
      // Tentative de connexion
      await signIn(email, password);
      // Redirection après connexion réussie
      router.replace('/(tabs)');
    } catch (err) {
      // Gestion des erreurs de connexion
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
    >
      <ImageBackground
        source={require('@/assets/images/home.png')}
        style={loginScreenStyles.background}
      >
        {/* En-tête de l'application */}
        <View style={loginScreenStyles.header}>
          <Text style={loginScreenStyles.appName}>MOBIDICAL</Text>
        </View>

        {/* Conteneur principal du formulaire */}
        <View style={loginScreenStyles.container}>
          {/* Logo de l'application */}
          <Image
            source={require('@/assets/images/app_logo.png')}
            style={loginScreenStyles.centeredLogo}
          />

          {/* Titre de bienvenue */}
          <Text variant="h1" style={loginScreenStyles.title}>Welcome Back</Text>

          {/* Affichage des erreurs générales */}
          {error && <Text style={loginScreenStyles.errorText}>{error}</Text>}

          {/* Champ de saisie Email */}
          <View style={loginScreenStyles.inputContainer}>
            <Text style={loginScreenStyles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={handleEmailChange}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[
                loginScreenStyles.input,
                emailError ? loginScreenStyles.inputError : {}
              ]}
            />
            {/* Messages de validation d'email */}
            {emailError ? (
              <Text style={loginScreenStyles.validationError}>{emailError}</Text>
            ) : email && !emailError && (
              <Text style={loginScreenStyles.validationSuccess}>Email is valid</Text>
            )}
          </View>

          {/* Champ de saisie Mot de passe */}
          <View style={loginScreenStyles.inputContainer}>
            <Text style={loginScreenStyles.label}>Password</Text>
            <View style={loginScreenStyles.passwordInputContainer}>
              <TextInput
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!showPassword}
                style={[
                  loginScreenStyles.input,
                  passwordError ? loginScreenStyles.inputError : {}
                ]}
              />
              {/* Bouton de toggle pour afficher/masquer le mot de passe */}
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={loginScreenStyles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={24} color="#666" />
                ) : (
                  <Eye size={24} color="#666" />
                )}
              </TouchableOpacity>
            </View>
            {/* Messages de validation de mot de passe */}
            {passwordError ? (
              <Text style={loginScreenStyles.validationError}>
                Password needs: {passwordError}
              </Text>
            ) : password && !passwordError && (
              <Text style={loginScreenStyles.validationSuccess}>Password is strong</Text>
            )}
          </View>

          {/* Bouton de connexion */}
          <Button
            title={loading ? "Signing In..." : "Sign In"}
            onPress={handleLogin}
            disabled={loading}
            style={loginScreenStyles.button}
          />

          {/* Liens supplémentaires */}
          <View style={loginScreenStyles.linksContainer}>
            <TouchableOpacity
              onPress={() => router.push('/register')}
              style={loginScreenStyles.link}
            >
              <Text>Create an account</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/reset-password')}>
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
}