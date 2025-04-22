import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Text,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { images } from '@/theme/images';
import useTheme from '@/theme/useTheme';
import { settingscreenstyles } from '@/utils/styles';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/navigation/AuthContext';
import { colors } from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { router, useNavigationContainerRef } from 'expo-router';

const Settings = () => {
  const router = useRouter();
  const { isDarkMode, theme, toggleTheme } = useTheme();
  const { signOut } = useAuth();
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const rootNavigation = useNavigationContainerRef();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const languages = [
    { label: 'English', value: 'en-US' },
    { label: 'Français', value: 'fr-FR' },
  ];

  useEffect(() => {
    const loadPreferences = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      const savedNotification = await AsyncStorage.getItem("notifications");
      if (savedLanguage) i18n.changeLanguage(savedLanguage);
      if (savedNotification !== null) {
        const enabled = savedNotification === 'true';
        setNotificationEnabled(enabled);
        await Audio.setIsEnabledAsync(enabled);
      }
    };
    loadPreferences();
  }, []);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  const toggleNotifications = async (enabled: boolean) => {
    setNotificationEnabled(enabled);
    await AsyncStorage.setItem("notifications", String(enabled));
    await Audio.setIsEnabledAsync(enabled);
  };

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logoutConfirm'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('confirm'),
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(); // clear user
              rootNavigation.dispatch(StackActions.popToTop());
              router.replace('/login'); // navigate without back history
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={[settingscreenstyles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[settingscreenstyles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={settingscreenstyles.headerContainer}>
          <TouchableOpacity style={settingscreenstyles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.iconColor} />
          </TouchableOpacity>
          <Text style={[settingscreenstyles.appName, { color: theme.textPrimary }]}>MOBIDICAL</Text>
          <Image source={images.app_logo} style={settingscreenstyles.logo} tintColor={theme.iconColor} />
        </View>

        <ScrollView contentContainerStyle={settingscreenstyles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Profil & Notifications */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/profil')}>
              <Feather name="user" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('updateProfile')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>

            <View style={[settingscreenstyles.divider, { backgroundColor: theme.separator }]} />
            <View style={settingscreenstyles.settingItem}>
              <Ionicons name="notifications-outline" size={24} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('notification')}</Text>
              <Switch
                value={notificationEnabled}
                onValueChange={toggleNotifications}
                trackColor={{
                  false: colors.palette.owl200,
                  true: theme.switchTrackActive,
                }}
                thumbColor={colors.palette.owl200}
                style={settingscreenstyles.switch}
              />
            </View>

            <View style={[settingscreenstyles.divider, { backgroundColor: theme.separator }]} />

            {/* Langue */}
            <TouchableOpacity
              style={settingscreenstyles.settingItem}
              onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <MaterialIcons name="translate" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('settings.language')}</Text>
              <View style={settingscreenstyles.languageSelector}>
                <Text style={[settingscreenstyles.languageText, { color: theme.textSecondary }]}>
                  {currentLanguage === 'fr-FR' ? 'Français' : 'English'}
                </Text>
                <AntDesign name="down" size={16} color={colors.palette.owl200} />
              </View>
            </TouchableOpacity>

            {showLanguageDropdown && (
              <View style={{ marginLeft: 55, marginTop: -10, marginBottom: 10 }}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang.value}
                    style={{ paddingVertical: 6 }}
                    onPress={() => {
                      changeLanguage(lang.value);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <Text style={{ color: theme.textSecondary, fontSize: 14 }}>{lang.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Dark Mode */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <View style={settingscreenstyles.settingItem}>
              <Ionicons name="moon-outline" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('darkMode')}</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: colors.palette.owl200,
                  true: theme.switchTrackActive,
                }}
                thumbColor={colors.palette.owl200}
                style={settingscreenstyles.switch}
              />
            </View>
          </View>

          {/* Enfant & Préférences */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/Settings/UpdateInfochildScreen')}>
              <Feather name="edit" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('editChildInfo')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>

            <View style={[settingscreenstyles.divider, { backgroundColor: theme.separator }]} />

            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/Settings/ProfressionChildScreen')}>
              <Feather name="bar-chart-2" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('childProgress')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>

            <View style={[settingscreenstyles.divider, { backgroundColor: theme.separator }]} />

            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/Settings/PreferencesScreen')}>
              <Feather name="settings" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('preferences')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>
          </View>

          {/* Informations */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/Settings/FeedbackScreen')}>
              <MaterialIcons name="feedback" size={24} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('feedback')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>

            <View style={[settingscreenstyles.divider, { backgroundColor: theme.separator }]} />

            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/Settings/RequimentScreen')}>
              <AntDesign name="questioncircleo" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('requirements')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>

            <View style={[settingscreenstyles.divider, { backgroundColor: theme.separator }]} />

            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={() => router.push('/Settings/AboutScreen')}>
              <AntDesign name="exclamationcircleo" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('about')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>
          </View>

          {/* Déconnexion */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem} onPress={handleLogout}>
              <AntDesign name="logout" size={22} color="red" style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>{t('logout')}</Text>
              <AntDesign name="right" size={16} color={colors.palette.owl200} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
