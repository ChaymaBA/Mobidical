import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import useTheme from '@/theme/useTheme';
import { RequimentScreenstyles as styles } from './stylesS';

const AppDescriptionScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();

  const appSections = [
    'overview',
    'game',
    'moto',
    'interaction',
    'communication',
    'feedback',
  ];

  const renderSection = (key: string, index: number) => (
    <View key={index}>
      <Text style={[styles.heading, { color: theme.textPrimary }]}>
        {t(`appDescription.${key}Title`)}
      </Text>
      <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
        {t(`appDescription.${key}Content`)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>

        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={router.back}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>

          <Text style={styles.appName}>MOBIDICAL</Text>

          <Image
            source={require('@/assets/images/app_logo.png')}
            style={styles.logo}
          />
        </View>

        {/* Sections */}
        {appSections.map((section, index) => renderSection(section, index))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default AppDescriptionScreen;
