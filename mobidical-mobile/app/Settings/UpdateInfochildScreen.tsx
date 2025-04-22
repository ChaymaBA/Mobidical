import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TextStyle,
    ViewStyle
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { RadioButton } from '@/components/RadioButton';
import { DatePicker } from '@/components/PikeDate';
import { images } from '@/theme/images';
import { editChildInfoStyles } from './stylesS';
import useTheme from '@/theme/useTheme';
import { useAuth } from '@/navigation/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '@/theme';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [initialLoading, setInitialLoading] = useState(true);

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

    useEffect(() => {
        loadExistingData();
    }, []);

    const loadExistingData = async () => {
        try {
            const userId = user?.uid || 'anonymous';
            const kidsInfoString = await AsyncStorage.getItem(`kidsInfo_${userId}`);
            if (kidsInfoString) {
                const kidsInfo = JSON.parse(kidsInfoString);
                let formattedData = { ...kidsInfo };
                if (kidsInfo.birth_date?.includes('-')) {
                    const [year, month, day] = kidsInfo.birth_date.split('-');
                    formattedData.birth_date = `${day}/${month}/${year}`;
                }
                reset(formattedData);
            }
        } catch (err) {
            console.error('Error loading existing data:', err);
            setError(t('errorLoadingKidsInfo'));
        } finally {
            setInitialLoading(false);
        }
    };

    const genderOptions = [t('male'), t('female')];

    const onSubmit = async (data: KidsInfoFormInputs) => {
        setLoading(true);
        try {
            const formattedData = { ...data };
            if (data.birth_date.includes('/')) {
                const [day, month, year] = data.birth_date.split('/');
                formattedData.birth_date = `${year}-${month}-${day}`;
            }

            const userId = user?.uid || 'anonymous';
            await AsyncStorage.setItem(`kidsInfo_${userId}`, JSON.stringify(formattedData));

            Alert.alert(
                t('updateSuccess'),
                t('kidsInfoUpdated'),
                [{ text: 'OK', onPress: () => router.back() }]
            );
        } catch (err) {
            console.error(err);
            setError(t('errorSavingKidsInfo'));
            Alert.alert(t('error'), t('failedToUpdateKidsInfo'));
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <SafeAreaView style={[editChildInfoStyles.safeArea, { backgroundColor: theme.background }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: theme.textPrimary } as TextStyle}>{t('loading')}...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Define theme-specific text styles
    const labelStyle: TextStyle = {
        ...editChildInfoStyles.inputLabel,
        color: theme.textPrimary
    };

    const errorTextStyle: TextStyle = {
        ...editChildInfoStyles.errorText,
        color: theme.error
    };

    // Style commun pour tous les champs avec fond blanc
    const inputStyle: TextStyle = {
        ...editChildInfoStyles.inputField,
        backgroundColor: colors.palette.white
    };

    // Style spécifique pour le champ de diagnostic (multiline)
    const diagnosisInputStyle: TextStyle = {
        ...inputStyle,
        height: 100,
        textAlignVertical: 'top'
    };

    const buttonStyle: ViewStyle = {
        ...editChildInfoStyles.button,
        flex: 1,
        marginLeft: 10,
        backgroundColor: theme.primary
    };

    const cancelButtonStyle: ViewStyle = {
        ...editChildInfoStyles.button,
        flex: 1,
        marginRight: 10,
        backgroundColor: theme.textSecondary
    };

    const appNameStyle: TextStyle = {
        ...editChildInfoStyles.appName,
        color: theme.primary
    };

    return (
        <SafeAreaView style={[editChildInfoStyles.safeArea, { backgroundColor: theme.background }]}>
            <View style={[editChildInfoStyles.container, { backgroundColor: theme.background }]}>
                <View style={editChildInfoStyles.headerContainer}>
                    <TouchableOpacity style={editChildInfoStyles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={theme.primary} />
                    </TouchableOpacity>
                    <Text style={appNameStyle}>MOBIDICAL</Text>
                    <Image source={images.app_logo} style={editChildInfoStyles.logo} />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={editChildInfoStyles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {error ? <Text style={errorTextStyle}>{error}</Text> : null}

                        {/* First Name */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('firstName')}</Text>
                            <TextInput
                                name="first_name"
                                leftIcon="person"
                                control={control}
                                rules={{ required: t('firstNameRequired') }}
                                style={inputStyle}
                                placeholder={t('enterFirstName')}
                                placeholderTextColor={theme.textSecondary}
                            />
                            {errors.first_name && (
                                <Text style={errorTextStyle}>{errors.first_name.message}</Text>
                            )}
                        </View>

                        {/* Last Name */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('lastName')}</Text>
                            <TextInput
                                name="last_name"
                                leftIcon="person"
                                control={control}
                                rules={{ required: t('lastNameRequired') }}
                                style={inputStyle}
                                placeholder={t('enterLastName')}
                                placeholderTextColor={theme.textSecondary}
                            />
                            {errors.last_name && (
                                <Text style={errorTextStyle}>{errors.last_name.message}</Text>
                            )}
                        </View>

                        {/* Birth Date */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('birthDate')}</Text>
                            <DatePicker
                                name="birth_date"
                                leftIcon="calendar"
                                control={control}
                                rules={{ required: t('birthDateRequired') }}
                                placeholder={t('setDate')}
                                style={inputStyle}
                                maximumDate={new Date()}
                            />
                            {errors.birth_date && (
                                <Text style={errorTextStyle}>{errors.birth_date.message}</Text>
                            )}
                        </View>

                        {/* Gender - pour RadioButton, enveloppez dans un conteneur blanc si nécessaire */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('gender')}</Text>
                            <View style={{ backgroundColor: colors.palette.white, borderRadius: 8, padding: 8 }}>
                                <Controller
                                    control={control}
                                    name="gender"
                                    rules={{ required: t('genderRequired') }}
                                    render={({ field: { onChange, value } }) => (
                                        <RadioButton
                                            options={genderOptions}
                                            value={value}
                                            onChange={onChange}
                                            disabled={loading}
                                        />
                                    )}
                                />
                            </View>
                            {errors.gender && (
                                <Text style={errorTextStyle}>{errors.gender.message}</Text>
                            )}
                        </View>

                        {/* Diagnosis */}
                        <View style={editChildInfoStyles.inputContainer}>
                            <Text style={labelStyle}>{t('diagnosis')}</Text>
                            <TextInput
                                name="diagnosis"
                                control={control}
                                leftIcon="medical"
                                rules={{ required: t('diagnosisRequired') }}
                                style={diagnosisInputStyle}
                                placeholder={t('enterDiagnosis')}
                                placeholderTextColor={theme.textSecondary}
                                multiline
                                numberOfLines={3}
                            />
                            {errors.diagnosis && (
                                <Text style={errorTextStyle}>{errors.diagnosis.message}</Text>
                            )}
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <TouchableOpacity
                                style={cancelButtonStyle}
                                onPress={() => router.back()}
                            >
                                <Text style={{ color: theme.card, textAlign: 'center', fontWeight: 'bold' } as TextStyle}>
                                    {t('cancel')}
                                </Text>
                            </TouchableOpacity>

                            <Button
                                title={loading ? t('updating') : t('saveChanges')}
                                onPress={handleSubmit(onSubmit)}
                                style={buttonStyle}
                                textStyle={{ color: theme.background } as TextStyle}
                                disabled={loading}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}
