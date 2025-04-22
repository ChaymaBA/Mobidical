import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';  // Import necessary components
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';  
import useTheme from '@/theme/useTheme';
import { RequimentScreenstyles } from './stylesS'; 
import { useRouter } from 'expo-router';


const AppDescriptionScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();


  return (
    <SafeAreaView style={RequimentScreenstyles.safeArea}>  
      <ScrollView style={RequimentScreenstyles.container}>
        <View style={RequimentScreenstyles.headerContainer}>
          <TouchableOpacity style={RequimentScreenstyles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={RequimentScreenstyles.appName}>MOBIDICAL</Text>
          <Image source={require('@/assets/images/app_logo.png')} style={RequimentScreenstyles.logo} /> {/* Fix Image import */}
        </View>

        <Text style={[RequimentScreenstyles.heading, { color: theme.textPrimary }]}>
          {t('appDescription.overviewTitle')}
        </Text>
        <Text style={[RequimentScreenstyles.paragraph, { color: theme.textSecondary }]}>
          {t('appDescription.overviewContent')}
        </Text>

        <Text style={[RequimentScreenstyles.heading, { color: theme.textPrimary }]}>
          {t('appDescription.gameTitle')}
        </Text>
        <Text style={[RequimentScreenstyles.paragraph, { color: theme.textSecondary }]}>
          {t('appDescription.gameContent')}
        </Text>

        <Text style={[RequimentScreenstyles.heading, { color: theme.textPrimary }]}>
          {t('appDescription.motoTitle')}
        </Text>
        <Text style={[RequimentScreenstyles.paragraph, { color: theme.textSecondary }]}>
          {t('appDescription.motoContent')}
        </Text>

        <Text style={[RequimentScreenstyles.heading, { color: theme.textPrimary }]}>
          {t('appDescription.interactionTitle')}
        </Text>
        <Text style={[RequimentScreenstyles.paragraph, { color: theme.textSecondary }]}>
          {t('appDescription.interactionContent')}
        </Text>

        <Text style={[RequimentScreenstyles.heading, { color: theme.textPrimary }]}>
          {t('appDescription.communicationTitle')}
        </Text>
        <Text style={[RequimentScreenstyles.paragraph, { color: theme.textSecondary }]}>
          {t('appDescription.communicationContent')}
        </Text>

        <Text style={[RequimentScreenstyles.heading, { color: theme.textPrimary }]}>
          {t('appDescription.feedbackTitle')}
        </Text>
        <Text style={[RequimentScreenstyles.paragraph, { color: theme.textSecondary }]}>
          {t('appDescription.feedbackContent')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles (if any styles are missing, you can define them here)

export default AppDescriptionScreen;
