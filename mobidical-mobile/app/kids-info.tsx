import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Image,
    Alert,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { RadioButton } from '@/components/RadioButton';
import { DatePicker } from '@/components/PikeDate';
import { images } from '@/theme/images';
import useTheme from '@/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { registerScreenStyles } from '@/utils/styles';
import { colors } from '@/theme/colors';
import { useAuth } from '@/navigation/AuthContext';

type KidsInfoFormInputs = {
    first_name: string;
    last_name: string;
    birth_date: string;
    gender: string;
    diagnosis: string;
};

const genderOptions = ['Male', 'Female'];

export default function KidsInfoScreen() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { theme } = useTheme();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const isWeb = Platform.OS === 'web';

    // react-hook-form setup
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<KidsInfoFormInputs>({
        defaultValues: {
            first_name: '',
            last_name: '',
            birth_date: '',
            gender: '',
            diagnosis: '',
        },
    });

    // Handle keyboard visibility for layout spacing
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const onSubmit = async (data: KidsInfoFormInputs) => {
        setLoading(true);
        try {
            const formatted = { ...data };

            // Format birth_date to YYYY-MM-DD
            if (formatted.birth_date.includes('/')) {
                const [day, month, year] = formatted.birth_date.split('/');
                formatted.birth_date = `${year}-${month}-${day}`;
            }

            const userId = user?.uid || 'anonymous';

            // 
            await axios.post('http://192.168.1.19:3000/api/children', {
                ...formatted,
                user_id: userId, 
            });

            await AsyncStorage.setItem(`kidsInfo_${userId}`, JSON.stringify(formatted));
            await AsyncStorage.setItem(`kidsInfoCompleted_${userId}`, 'true');

            // Navigation après succès
            router.replace('/(tabs)');
        } catch (err) {
            console.error(err);
            setError(t('errorSavingKidsInfo'));
            Alert.alert('Error', t('errorSavingKidsInfo'));
        } finally {
            setLoading(false);
        }
    };

    const renderLabel = (label: string) => (
        <Text style={registerScreenStyles.inputLabel}>{label}</Text>
    );

    const renderError = (fieldError?: { message?: string }) =>
        fieldError?.message ? <Text style={registerScreenStyles.errorText}>{fieldError.message}</Text> : null;

    const renderInput = (
        name: keyof KidsInfoFormInputs,
        label: string,
        placeholder: string,
        icon: string,
        multiline = false,
        height = undefined
    ) => (
        <View style={registerScreenStyles.inputContainer}>
            {renderLabel(label)}
            <TextInput
                name={name}
                control={control}
                rules={{ required: `${label} is required` }}
                placeholder={placeholder}
                placeholderTextColor={colors.palette.text100}
                multiline={multiline}
                style={height ? [{ height, textAlignVertical: 'top' }] : undefined}
            />
            {renderError(errors[name])}
        </View>
    );

    // Main form layout
    const form = (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: keyboardVisible ? 120 : 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator
        >
            {/* Header with app name and logo */}
            <View style={registerScreenStyles.header}>
                <Text style={registerScreenStyles.appName}>MOBIDICAL</Text>
                <Image source={images.app_logo} style={registerScreenStyles.logo} />
            </View>

            <Text variant="h1" style={registerScreenStyles.titleR}>{t('kid Information')}</Text>
            {error ? <Text style={registerScreenStyles.errorText}>{error}</Text> : null}

            {renderInput('first_name', t('firstName'), t('enterFirstName'), 'person')}
            {renderInput('last_name', t('lastName'), t('enterLastName'), 'person')}

            {/* Date Picker for birth date */}
            <View style={registerScreenStyles.inputContainer}>
                {renderLabel(t('birthDate'))}
                <DatePicker
                    name="birth_date"
                    leftIcon="calendar"
                    control={control}
                    rules={{ required: t('birthDateRequired') }}
                    placeholder={t('Définir la date')}
                    disabled={loading}
                    maximumDate={new Date()}
                />
                {renderError(errors.birth_date)}
            </View>

            {/* Radio buttons for gender */}
            <View style={registerScreenStyles.inputContainer}>
                {renderLabel(t('gender'))}
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
                {renderError(errors.gender)}
            </View>

            {/* Diagnosis multiline input */}
            {renderInput('diagnosis', t('diagnosis'), t('enterDiagnosis'), 'medical', true)}

            {/* Submit button */}
            <Button
                title={loading ? t('saving') : t('continueToApp')}
                onPress={handleSubmit(onSubmit)}
                style={registerScreenStyles.button}
                disabled={loading}
            />
        </ScrollView>
    );

    return (
        <ImageBackground source={images.home} style={registerScreenStyles.backgroundImage}>
            <SafeAreaView style={registerScreenStyles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                >
                    {/* Dismiss keyboard on tap outside (except for web) */}
                    {isWeb ? form : (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            {form}
                        </TouchableWithoutFeedback>
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}
