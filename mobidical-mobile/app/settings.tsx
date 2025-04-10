import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import {
  Ionicons,
  Feather,
  MaterialIcons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { images } from '@/theme/images';
import useTheme from '@/theme/useTheme';
import { Theme } from '@/theme/type';
import { settingscreenstyles } from '@/utils/styles';
import { colors } from '@/theme/colors';

const Settings = () => {
  const router = useRouter();
  const { isDarkMode, theme, toggleTheme } = useTheme() as {
    isDarkMode: boolean;
    theme: Theme;
    toggleTheme: () => void;
  };

  return (
    <SafeAreaView style={settingscreenstyles.safeArea}>
      <View style={settingscreenstyles.container}>
        <View style={settingscreenstyles.headerContainer}>
          <TouchableOpacity
            style={settingscreenstyles.backButton}
            onPress={() => router.back()}
          >
            <Text style={settingscreenstyles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={settingscreenstyles.appName}>MOBIDICAL</Text>
          <Image source={images.app_logo} style={settingscreenstyles.logo} />
        </View>

        <Text style={settingscreenstyles.pageTitle}>Settings</Text>

        <ScrollView
          contentContainerStyle={settingscreenstyles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* First Section */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <Feather name="folder" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>File Location</Text>
            </TouchableOpacity>

            <View style={settingscreenstyles.divider} />

            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <Feather name="grid" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Display</Text>
              <Text style={[settingscreenstyles.settingValue, { color: theme.textSecondary }]}>Two columns</Text>
            </TouchableOpacity>

            <View style={settingscreenstyles.divider} />

            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <MaterialIcons name="translate" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Language</Text>
              <Text style={[settingscreenstyles.settingValue, { color: theme.textSecondary }]}>English (UK)</Text>
            </TouchableOpacity>
          </View>

          {/* Dark Mode Section */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <View style={settingscreenstyles.settingItem}>
              <Ionicons name="moon-outline" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.switchTrackInactive,
                  true: theme.switchTrackActive,
                }}
                thumbColor={theme.switchThumb}
                style={settingscreenstyles.switch}
              />
            </View>
          </View>

          {/* Clear Section */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <FontAwesome name="trash-o" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Clear Downloads</Text>
            </TouchableOpacity>

            <View style={settingscreenstyles.divider} />

            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <FontAwesome name="trash-o" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Clear Cache</Text>
            </TouchableOpacity>
          </View>

          {/* Info Section */}
          <View style={[settingscreenstyles.section, { backgroundColor: theme.card }]}>
            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <Feather name="file-text" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Privacy Policy</Text>
            </TouchableOpacity>

            <View style={settingscreenstyles.divider} />

            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <AntDesign name="star" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>Rate Us</Text>
            </TouchableOpacity>

            <View style={settingscreenstyles.divider} />

            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <Feather name="grid" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>More Apps</Text>
            </TouchableOpacity>

            <View style={settingscreenstyles.divider} />

            <TouchableOpacity style={settingscreenstyles.settingItem}>
              <AntDesign name="exclamationcircleo" size={22} color={theme.iconColor} style={settingscreenstyles.icon} />
              <Text style={[settingscreenstyles.settingText, { color: theme.textPrimary }]}>About</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;