import React, { useState, useCallback } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput } from '@/components/TextInput';
import { RadioButton } from '@/components/RadioButton';
import useTheme from '@/theme/useTheme';
import { images } from '@/theme/images';
import { colors } from '@/theme/colors';
import { getPreferencesScreenStyles } from './stylesS';

// Types
type PreferencesFormValues = {
    preferred_colors: string;
    audio_sensitivity: 'low' | 'medium' | 'high';
    prefers_animations: boolean;
    visual_complexity: number;
    favorite_activities: string[];
    language: string;
};

// Storage keys for AsyncStorage
const STORAGE_KEYS = {
    COLOR: 'userColor',
    AUDIO_SENSITIVITY: 'audioSensitivity',
    ANIMATIONS: 'prefersAnimations',
    VISUAL_COMPLEXITY: 'visualComplexity',
    ACTIVITIES: 'favoriteActivities',
    LANGUAGE: 'language',
};

// Default form values
const DEFAULT_FORM_VALUES: PreferencesFormValues = {
    preferred_colors: colors.palette.owl200,
    audio_sensitivity: 'medium',
    prefers_animations: true,
    visual_complexity: 3,
    favorite_activities: [],
    language: 'en',
};

// Components
const CheckboxGroup: React.FC<{
    label: string;
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
}> = ({ label, options, selected, onChange }) => {
    const { theme } = useTheme();
    const styles = getPreferencesScreenStyles(theme);

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

const ColorSelector: React.FC<{
    color: string;
    onChange: (color: string) => void;
    label: string;
}> = ({ color, onChange, label }) => {
    const router = useRouter();
    const { theme } = useTheme();
    const { t } = useTranslation();
    const styles = getPreferencesScreenStyles(theme);

    const navigateToColorPicker = () => {
        const currentColor = color || '#3498db';
        router.push({
            pathname: '/Settings/Color-Picker',
            params: { initialColor: currentColor },
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

const Header: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { theme } = useTheme();
    const styles = getPreferencesScreenStyles(theme);

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color={theme.primary} />
            </TouchableOpacity>
            <Text style={styles.appName}>MOBIDICAL</Text>
            <Image source={images.app_logo} style={styles.logo} />
        </View>
    );
};

// Main component
const PreferencesScreen = () => {
    const { theme } = useTheme();
    const styles = getPreferencesScreenStyles(theme);
    const { t } = useTranslation();
    const router = useRouter();

    // Form setup
    const { control, handleSubmit, setValue } = useForm<PreferencesFormValues>({
        defaultValues: DEFAULT_FORM_VALUES,
    });

    // Load preferences from storage
    const loadPreferences = useCallback(async () => {
        try {
            const color = await AsyncStorage.getItem(STORAGE_KEYS.COLOR);
            const audioSensitivity = await AsyncStorage.getItem(STORAGE_KEYS.AUDIO_SENSITIVITY);
            const prefersAnimations = await AsyncStorage.getItem(STORAGE_KEYS.ANIMATIONS);
            const visualComplexity = await AsyncStorage.getItem(STORAGE_KEYS.VISUAL_COMPLEXITY);
            const favoriteActivities = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES);
            const language = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);

            if (color) setValue('preferred_colors', color);
            if (audioSensitivity) setValue('audio_sensitivity', audioSensitivity as 'low' | 'medium' | 'high');
            if (prefersAnimations) setValue('prefers_animations', JSON.parse(prefersAnimations));
            if (visualComplexity) setValue('visual_complexity', Number(visualComplexity));
            if (favoriteActivities) setValue('favorite_activities', JSON.parse(favoriteActivities));
            if (language) setValue('language', language);
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
    }, [setValue]);

    // Load preferences on mount
    React.useEffect(() => {
        loadPreferences();
    }, [loadPreferences]);

    // Update when coming back to screen
    useFocusEffect(
        useCallback(() => {
            loadPreferences();
            return () => { }; // Cleanup if needed
        }, [loadPreferences])
    );

    // Save preferences
    const savePreferences = async (data: PreferencesFormValues) => {
        try {
            const savePromises = [
                AsyncStorage.setItem(STORAGE_KEYS.COLOR, data.preferred_colors),
                AsyncStorage.setItem(STORAGE_KEYS.AUDIO_SENSITIVITY, data.audio_sensitivity),
                AsyncStorage.setItem(STORAGE_KEYS.ANIMATIONS, JSON.stringify(data.prefers_animations)),
                AsyncStorage.setItem(STORAGE_KEYS.VISUAL_COMPLEXITY, data.visual_complexity.toString()),
                AsyncStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(data.favorite_activities)),
                AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, data.language),
            ];

            await Promise.all(savePromises);
            router.back();
        } catch (error) {
            console.error('Failed to save preferences:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header onBack={() => router.back()} />

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
                                        value={value}
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
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit(savePreferences)}
                        >
                            <Text style={styles.buttonText}>{t('preferences.save')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

export default PreferencesScreen;