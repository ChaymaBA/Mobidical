import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    TouchableOpacity,
    Image,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';
import { TextInput } from '@/components/TextInput';
import { RadioButton } from '@/components/RadioButton';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import useTheme from '@/theme/useTheme';
import { images } from '@/theme/images';
import { getPreferencesScreenStyles } from './stylesS';
import { colors } from '@/theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type PreferencesFormValues = {
    preferred_colors: string;
    audio_sensitivity: 'low' | 'medium' | 'high';
    prefers_animations: boolean;
    visual_complexity: number;
    favorite_activities: string[];
    language: string;
};

interface CheckboxGroupProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    label,
    options,
    selected,
    onChange,
}) => {
    const { theme } = useTheme();
    const styles = useMemo(() => getPreferencesScreenStyles(theme), [theme]);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter((item) => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    return (
        <View style={styles.checkboxContainer}>
            <Text style={styles.label}>{label}</Text>
            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    style={styles.checkboxRow}
                    onPress={() => toggleOption(option)}
                >
                    <View
                        style={[styles.checkbox, selected.includes(option) && styles.checkboxSelected]}
                    />
                    <Text style={styles.checkboxLabel}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

interface ColorSelectorProps {
    color: string;
    onChange: (color: string) => void;
    label: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
    color,
    onChange,
    label,
}) => {
    const router = useRouter();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = useMemo(() => getPreferencesScreenStyles(theme), [theme]);

    const navigateToColorPicker = () => {
        const currentColor = color || '#3498db';
        router.push({
            pathname: '/Settings/Color-Picker',
            params: {
                initialColor: currentColor,
            },
        });
    };

    return (
        <View style={styles.section}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.colorPickerButton}
                onPress={navigateToColorPicker}
            >
                <View style={styles.colorPickerContent}>
                    <View style={[styles.colorPreview, { backgroundColor: color || '#3498db' }]} />
                    <Text style={styles.colorPickerText}>{t('select_color')}</Text>
                </View>
                <Ionicons name="color-palette-outline" size={24} color={theme.primary} />
            </TouchableOpacity>
        </View>
    );
};

const PreferencesScreen = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => getPreferencesScreenStyles(theme), [theme]);
    const { t } = useTranslation();
    const router = useRouter();

    const [savedColor, setSavedColor] = useState<string>(colors.palette.owl200);

    const { control, handleSubmit, setValue } = useForm<PreferencesFormValues>({
        defaultValues: {
            preferred_colors: colors.palette.owl200,
            audio_sensitivity: 'medium',
            prefers_animations: true,
            visual_complexity: 3,
            favorite_activities: [],
            language: 'en',
        },
    });

    // Charger les préférences sauvegardées au montage initial
    useEffect(() => {
        const loadSavedPreferences = async () => {
            try {
                const color = await AsyncStorage.getItem('userColor');
                const audioSensitivity = await AsyncStorage.getItem('audioSensitivity');
                const prefersAnimations = await AsyncStorage.getItem('prefersAnimations');
                const visualComplexity = await AsyncStorage.getItem('visualComplexity');
                const favoriteActivities = await AsyncStorage.getItem('favoriteActivities');
                const language = await AsyncStorage.getItem('language');

                if (color) {
                    setSavedColor(color);
                    setValue('preferred_colors', color);
                }
                if (audioSensitivity) setValue('audio_sensitivity', audioSensitivity as 'low' | 'medium' | 'high');
                if (prefersAnimations) setValue('prefers_animations', JSON.parse(prefersAnimations));
                if (visualComplexity) setValue('visual_complexity', Number(visualComplexity));
                if (favoriteActivities) setValue('favorite_activities', JSON.parse(favoriteActivities));
                if (language) setValue('language', language);
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        };
        loadSavedPreferences();
    }, [setValue]);

    // Mettre à jour la couleur quand l'écran revient en focus
    useFocusEffect(
        React.useCallback(() => {
            const updateColorFromStorage = async () => {
                try {
                    const color = await AsyncStorage.getItem('userColor');
                    if (color) {
                        setSavedColor(color);
                        setValue('preferred_colors', color);
                    }
                } catch (error) {
                    console.error('Failed to update color:', error);
                }
            };

            updateColorFromStorage();

            return () => {
                // Cleanup si nécessaire
            };
        }, [setValue])
    );

    const onSubmit = async (data: PreferencesFormValues) => {
        console.log('Preferences:', data);

        try {
            await AsyncStorage.setItem('userColor', data.preferred_colors);
            await AsyncStorage.setItem('audioSensitivity', data.audio_sensitivity);
            await AsyncStorage.setItem('prefersAnimations', JSON.stringify(data.prefers_animations));
            await AsyncStorage.setItem('visualComplexity', data.visual_complexity.toString());
            await AsyncStorage.setItem('favoriteActivities', JSON.stringify(data.favorite_activities));
            await AsyncStorage.setItem('language', data.language);

            router.back(); // Retourne à l'écran précédent
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={theme.primary} />
                    </TouchableOpacity>
                    <Text style={styles.appName}>MOBIDICAL</Text>
                    <Image source={images.app_logo} style={styles.logo} />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.formContainer}
                    >
                        {/* Preferred Colors */}
                        <Controller
                            control={control}
                            name="preferred_colors"
                            render={({ field: { onChange, value } }) => (
                                <ColorSelector
                                    label={t('preferences preferred colors')}
                                    color={value}
                                    onChange={onChange}
                                />
                            )}
                        />

                        {/* Audio Sensitivity */}
                        <Controller
                            control={control}
                            name="audio_sensitivity"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.section}>
                                    <Text style={styles.label}>{t('preferences audio sensitivity')}</Text>
                                    <RadioButton
                                        options={['low', 'medium', 'high']}
                                        value={value as 'low' | 'medium' | 'high'}  // Cast explicite
                                        onChange={onChange}
                                        optionColor={colors.palette.text200}
                                    />
                                </View>
                            )}
                        />

                        {/* Prefers Animations */}
                        <Controller
                            control={control}
                            name="prefers_animations"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.row}>
                                    <Text style={styles.label}>{t('preferences prefers animations')}</Text>
                                    <Switch
                                        value={value}
                                        onValueChange={onChange}
                                        trackColor={{
                                            false: colors.palette.owl200,
                                            true: theme.switchTrackActive,
                                        }}
                                        thumbColor={colors.palette.owl200}
                                        style={styles.switch}
                                    />
                                </View>
                            )}
                        />

                        {/* Visual Complexity */}
                        <Controller
                            control={control}
                            name="visual_complexity"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.section}>
                                    <Text style={styles.label}>
                                        {t('preferences visual complexity')}: {value}
                                    </Text>
                                    <Slider
                                        minimumValue={1}
                                        maximumValue={5}
                                        step={1}
                                        value={value}
                                        onValueChange={onChange}
                                    />
                                </View>
                            )}
                        />

                        {/* Favorite Activities */}
                        <Controller
                            control={control}
                            name="favorite_activities"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.favoriteActivitiesContainer}>
                                    <CheckboxGroup
                                        label={t('preferences favorite activities')}
                                        options={[
                                            t('preferences puzzles'),
                                            t('preferences drawing'),
                                            t('preferences music'),
                                            t('preferences memory games'),
                                            t('preferences sorting'),
                                        ]}
                                        selected={value}
                                        onChange={onChange}
                                    />
                                </View>
                            )}
                        />

                        {/* Save Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.buttonText}>{t('preferences.save')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default PreferencesScreen;