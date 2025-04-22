import React, { useMemo } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import useTheme from '@/theme/useTheme';
import { getAboutScreenStyles } from './stylesS';
import { images } from '@/theme/images';

const AboutScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => getAboutScreenStyles(theme), [theme]);
  const { t } = useTranslation();
  const router = useRouter();

  const appVersion = Constants.expoConfig?.version || '1.0.0';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{t('aboutA.title')}</Text>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={images.app_logo} style={styles.logo} />
          <Text style={styles.appName}>MOBIDICAL</Text>
          <Text style={styles.versionText}>{t('version App')} {appVersion}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('Description')}</Text>
          <Text style={styles.sectionText}>{t('aboutA.description')}</Text>
        </View>

        {/* Developer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('DevelopedBy')}</Text>
          <Text style={styles.sectionText}>{t('aboutA.DevelopedBy')}</Text>
        </View>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('Technology')}</Text>
          <Text style={styles.sectionText}>{t('aboutA.technologyText')}</Text>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('Legal')}</Text>
          <Text style={styles.sectionText}>{t('aboutA.legalText')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
