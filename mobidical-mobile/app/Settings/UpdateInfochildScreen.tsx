import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TextStyle,
    ViewStyle,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { RadioButton } from '@/components/RadioButton';
import { DatePicker } from '@/components/PikeDate';
import { images } from '@/theme/images';
import { colors } from '@/theme';
import useTheme from '@/theme/useTheme';
import { useAuth } from '@/navigation/AuthContext';
import { editChildInfoStyles } from './stylesS';

// Type definition for form fields
type KidsInfoFormInputs = {
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    diagnosis: string;
};

export default function EditKidsInfoScreen() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { user } = useAuth();

    // States
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [initialLoading, setInitialLoading] = useState(true);

    // Form control
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<KidsInfoFormInputs>({
        defaultValues: {
            first_name: '',
            last_name: '',
            birth_date: '',
            gender: '',
            diagnosis: '',
        },
    });

    // Load saved child info from AsyncStorage on mount
    useEffect(() => {
        const loadExistingData = async () => {
            try {
                const userId = user?.uid || 'anonymous';
                const storedData = await AsyncStorage.getItem(`kidsInfo_${userId}`);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    // Format birth_date from yyyy-mm-dd to dd/mm/yyyy
                    if (parsedData.birth_date?.includes('-')) {
                        const [y, m, d] = parsedData.birth_date.split('-');
                        parsedData.birth_date = `${d}/${m}/${y}`;
                    }
                    reset(parsedData);
                }
            } catch (err) {
                console.error('Error loading existing data:', err);
                setError(t('errorLoadingKidsInfo'));
            } finally {
                setInitialLoading(false);
            }
        };

        loadExistingData();
    }, []);

    // Gender options for RadioButton
    const genderOptions = [t('male'), t('female')];

    // Handle form submit
    const onSubmit = async (data: KidsInfoFormInputs) => {
        setLoading(true);
        try {
            const formattedData = {
                ...data,
                birth_date: data.birth_date.includes('/')
                    ? data.birth_date.split('/').reverse().join('-')
                    : data.birth_date,
            };
            const userId = user?.uid || 'anonymous';
            await AsyncStorage.setItem(`kidsInfo_${userId}`, JSON.stringify(formattedData));
            Alert.alert(t('updateSuccess'), t('kidsInfoUpdated'), [{ text: 'OK', onPress: () => router.back() }]);
        } catch (err) {
            console.error('Saving error:', err);
            setError(t('errorSavingKidsInfo'));
            Alert.alert(t('error'), t('failedToUpdateKidsInfo'));
        } finally {
            setLoading(false);
        }
    };

    // Show loading screen while fetching data
    if (initialLoading) {
        return (
            <SafeAreaView style={[editChildInfoStyles.safeArea, { backgroundColor: theme.background }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: theme.textPrimary }}>{t('loading')}...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Styles with theme
    const labelStyle: TextStyle = { ...editChildInfoStyles.inputLabel, color: theme.textPrimary };
    const errorTextStyle: TextStyle = { ...editChildInfoStyles.errorText, color: theme.error };
    const inputStyle: TextStyle = { ...editChildInfoStyles.inputField, backgroundColor: colors.palette.white };
    const diagnosisInputStyle: TextStyle = { ...inputStyle, height: 100, textAlignVertical: 'top' };
    const cancelButtonStyle: ViewStyle = {
        ...editChildInfoStyles.button,
        flex: 1,
        marginRight: 10,
        backgroundColor: theme.textSecondary,
    };
    const buttonStyle: ViewStyle = {
        ...editChildInfoStyles.button,
        flex: 1,
        marginLeft: 10,
        backgroundColor: theme.primary,
    };
    const appNameStyle: TextStyle = { ...editChildInfoStyles.appName, color: theme.primary };

    return (
        <SafeAreaView style={[editChildInfoStyles.safeArea, { backgroundColor: theme.background }]}>
            <View style={[editChildInfoStyles.container]}>
                {/* Header Section */}
                <View style={editChildInfoStyles.headerContainer}>
                    <TouchableOpacity style={editChildInfoStyles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={theme.primary} />
                    </TouchableOpacity>
                    <Text style={appNameStyle}>MOBIDICAL</Text>
                    <Image source={images.app_logo} style={editChildInfoStyles.logo} />
                </View>

                {/* Form Body */}
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={editChildInfoStyles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Error Message */}
                        {error ? <Text style={errorTextStyle}>{error}</Text> : null}

                        {/* First Name */}
                        <FormField name="first_name" label={t('firstName')} placeholder={t('enterFirstName')} icon="person" rules={{ required: t('firstNameRequired') }} />

                        {/* Last Name */}
                        <FormField name="last_name" label={t('lastName')} placeholder={t('enterLastName')} icon="person" rules={{ required: t('lastNameRequired') }} />

                        {/* Birth Date Picker */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('birthDate')}</Text>
                            <DatePicker
                                name="birth_date"
                                control={control}
                                placeholder={t('setDate')}
                                rules={{ required: t('birthDateRequired') }}
                                leftIcon="calendar"
                                style={inputStyle}
                                maximumDate={new Date()}
                            />
                            {errors.birth_date && <Text style={errorTextStyle}>{errors.birth_date.message}</Text>}
                        </View>

                        {/* Gender Radio Buttons */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('gender')}</Text>
                            <View style={{ backgroundColor: colors.palette.white, borderRadius: 8, padding: 8 }}>
                                <Controller
                                    control={control}
                                    name="gender"
                                    rules={{ required: t('genderRequired') }}
                                    render={({ field: { onChange, value } }) => (
                                        <RadioButton options={genderOptions} value={value} onChange={onChange} disabled={loading} />
                                    )}
                                />
                            </View>
                            {errors.gender && <Text style={errorTextStyle}>{errors.gender.message}</Text>}
                        </View>

                        {/* Diagnosis */}
                        <FormField
                            name="diagnosis"
                            label={t('diagnosis')}
                            placeholder={t('enterDiagnosis')}
                            icon="medical"
                            rules={{ required: t('diagnosisRequired') }}
                            multiline
                            customStyle={diagnosisInputStyle}
                        />

                        {/* Submit & Cancel Buttons */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity style={cancelButtonStyle} onPress={() => router.back()}>
                                <Text style={{ color: theme.card, textAlign: 'center', fontWeight: 'bold' }}>
                                    {t('cancel')}
                                </Text>
                            </TouchableOpacity>
                            <Button
                                title={loading ? t('updating') : t('saveChanges')}
                                onPress={handleSubmit(onSubmit)}
                                style={buttonStyle}
                                textStyle={{ color: theme.background }}
                                disabled={loading}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );

    /**
     * Reusable form field component
     */
    function FormField({
        name,
        label,
        placeholder,
        icon,
        rules,
        multiline = false,
        customStyle,
    }: {
        name: keyof KidsInfoFormInputs;
        label: string;
        placeholder: string;
        icon: string;
        rules: any;
        multiline?: boolean;
        customStyle?: TextStyle;
    }) {
        return (
            <View style={editChildInfoStyles.inputContainer}>
                <Text style={labelStyle}>{label}</Text>
                <TextInput
                    name={name}
                    control={control}
                    rules={rules}
                    placeholder={placeholder}
                    placeholderTextColor={theme.textSecondary}
                    style={customStyle || inputStyle}
                    multiline={multiline}
                />
                {errors[name] && <Text style={errorTextStyle}>{errors[name]?.message}</Text>}
            </View>
        );
    }
}
