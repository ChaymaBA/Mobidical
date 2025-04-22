import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// import { i18n } from '@/i18n/i18n';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import useTheme from '@/theme/useTheme';

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
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>{t('settings.language')}</Text>
            {languages.map(lang => (
                <TouchableOpacity
                    key={lang.value}
                    style={[styles.option, i18n.language === lang.value && { backgroundColor: theme.accent }]}
                    onPress={() => handleLanguageChange(lang.value)}
                >
                    <Text style={[styles.label, { color: theme.textPrimary }]}>{lang.label}</Text>
                    {i18n.language === lang.value && (
                        <AntDesign name="check" size={16} color={theme.textPrimary} />
                    )}
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
    },
});

export default LanguageSelection;
