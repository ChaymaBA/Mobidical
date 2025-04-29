import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// import { i18n } from '@/i18n/i18n';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import useTheme from '@/theme/useTheme';
import { LanguageSelectionScreenstyles } from'./stylesS';

const languages = [
    { label: 'English', value: 'en' },
    { label: 'Français', value: 'fr' },
    { label: 'العربية', value: 'ar' },
];

const LanguageSelection = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const router = useRouter();

    const handleLanguageChange = (value: string) => {
        // i18n.changeLanguage(value);
        router.back(); // revenir à l'écran précédent
    };

    return (
        <SafeAreaView style={[LanguageSelectionScreenstyles.container, { backgroundColor: theme.background }]}>
            <Text style={[LanguageSelectionScreenstyles.title, { color: theme.textPrimary }]}>{t('settings.language')}</Text>
            {languages.map(lang => (
                <TouchableOpacity
                    key={lang.value}
                    style={[LanguageSelectionScreenstyles.option, { backgroundColor: theme.accent }]}
                    onPress={() => handleLanguageChange(lang.value)}
                >
                    <Text style={[LanguageSelectionScreenstyles.label, { color: theme.textPrimary }]}>{lang.label}</Text>
                    {(
                        <AntDesign name="check" size={16} color={theme.textPrimary} />
                    )}
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
};



export default LanguageSelection;
