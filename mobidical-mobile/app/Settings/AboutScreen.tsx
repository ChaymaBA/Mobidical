import React, { useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import useTheme from '@/theme/useTheme';
import { getAboutScreenStyles } from './stylesS'; // Fichier de styles dynamiques
import { images } from '@/theme/images';
import { colors } from '@/theme';

const AboutScreen = () => {
  const { theme } = useTheme(); // Récupère le thème (clair/sombre)
  const styles = useMemo(() => getAboutScreenStyles(theme), [theme]);
  const { t } = useTranslation(); // Hook de traduction
  const router = useRouter();

  const appVersion = Constants.expoConfig?.version || '1.0.0'; // Version de l'app

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header avec bouton retour */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={router.back} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.primary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{t('aboutA.title')}</Text>
        </View>

        {/* Logo de l'app, nom & version */}
        <View style={styles.logoContainer}>
          <Image source={images.app_logo} style={styles.logo} />
          <Text style={styles.appName}>MOBIDICAL</Text>
          <Text style={styles.versionText}>
            {t('version App')} {appVersion}
          </Text>
        </View>

        {/* Section Description */}
        <InfoSection
          title={t('Description')}
          content={t('aboutA.description')}
        />

        {/* Section Développeur */}
        <InfoSection
          title={t('DevelopedBy')}
          content={t('aboutA.DevelopedBy')}
        />

        {/* Section Technologies */}
        <InfoSection
          title={t('Technology')}
          content={t('aboutA.technologyText')}
        />

        {/* Section Mentions légales */}
        <InfoSection
          title={t('Legal')}
          content={t('aboutA.legalText')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// ✅ Composant réutilisable pour les sections (titre + texte)
const InfoSection = ({ title, content }: { title: string; content: string }) => (
  <View style={{ marginBottom: 20, paddingHorizontal: 20 }}>
    <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
      {title}
    </Text>
    <Text style={{ fontSize: 14, color:colors.palette.text100}}>
      {content}
    </Text>
  </View>
);

export default AboutScreen;
