import React, { useState, useEffect } from 'react';
import {
    View,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function KidsInfoScreen() {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const isWeb = Platform.OS === 'web';

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const genderOptions = ['Male', 'Female'];

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

    const onSubmit = async (data: KidsInfoFormInputs) => {
        setLoading(true);
        try {
      
            const formattedData = { ...data };
            if (data.birth_date && data.birth_date.includes('/')) {
                const [day, month, year] = data.birth_date.split('/');
                formattedData.birth_date = `${year}-${month}-${day}`;
            }

            const userId = user?.uid || 'anonymous';
            await AsyncStorage.setItem(`kidsInfo_${userId}`, JSON.stringify(formattedData));
            await AsyncStorage.setItem(`kidsInfoCompleted_${userId}`, 'true');
            router.replace('/(tabs)');
        } catch (err) {
            console.error(err);
            setError(t('errorSavingKidsInfo'));
            Alert.alert('Error', 'Failed to save kids information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const ScrollContent = (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: keyboardVisible ? 120 : 20 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            bounces={true}
        >
            <View style={registerScreenStyles.header}>
                <Text style={registerScreenStyles.appName}>MOBIDICAL</Text>
                <Image source={images.app_logo} style={registerScreenStyles.logo} />
            </View>

            <Text variant="h1" style={registerScreenStyles.titleR}>{t('kid Information')}</Text>
            {error ? <Text style={registerScreenStyles.errorText}>{error}</Text> : null}

          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>First Name</Text>
            <TextInput
              name="first_name"
              control={control}
              leftIcon='person'
              rules={{ required: 'First name is required' }}
              placeholder="Enter your first name"
              placeholderTextColor={colors.palette.text100}
            />
                {errors.first_name && (
                    <Text style={registerScreenStyles.errorText}>{errors.first_name.message}</Text>
                )}
            </View>

          {/* Last Name */}
          <View style={registerScreenStyles.inputContainer}>
            <Text style={registerScreenStyles.inputLabel}>Last Name</Text>
            <TextInput
              name="last_name"
              leftIcon='person'
              control={control}
              rules={{ required: 'Last name is required' }}
              placeholder="Enter your last name"
              placeholderTextColor={colors.palette.text100}
            />
      

                {errors.last_name && (
                    <Text style={registerScreenStyles.errorText}>{errors.last_name.message}</Text>
                )}
            </View>

            {/* Birth Date with enhanced DatePicker component */}
            <View style={registerScreenStyles.inputContainer}>
                <Text style={registerScreenStyles.inputLabel}>{t('birthDate')}</Text>
                <DatePicker
                    name="birth_date"
                    leftIcon='calendar'
                    control={control}
                    rules={{ required: t('birthDateRequired') }}
                    placeholder={t('Définir la date')}           
                    disabled={loading}
                    maximumDate={new Date()}
                />
                {errors.birth_date && (
                    <Text style={registerScreenStyles.errorText}>{errors.birth_date.message}</Text>
                )}
            </View>

            {/* Gender */}
            <View style={registerScreenStyles.inputContainer}>
                <Text style={registerScreenStyles.inputLabel}>{t('gender')}</Text>
                <Controller
                    control={control}
                    name="gender"
                    rules={{ required: t('genderRequired') }}
                    render={({ field: { onChange, value } }: { field: { onChange: (value: string) => void, value: string } }) => (
                        <RadioButton
                            options={genderOptions}
                            value={value}
                            onChange={onChange}
                            disabled={loading}
                        />
                    )}
                />
                {errors.gender && (
                    <Text style={registerScreenStyles.errorText}>{errors.gender.message}</Text>
                )}
            </View>

            {/* Diagnosis */}
            <View style={registerScreenStyles.inputContainer}>
                <Text style={registerScreenStyles.inputLabel}>{t('diagnosis')}</Text>
                <TextInput
                    name="diagnosis"
                    control={control}
                    leftIcon="medical"
                    rules={{ required: t('diagnosisRequired') }}
                    style={[ { height: 100, textAlignVertical: 'top' }]}
                    placeholder={t('enterDiagnosis')}
                    placeholderTextColor={colors.palette.text100}
                    multiline
                    numberOfLines={3}
                />

            
                {errors.diagnosis && (
                    <Text style={registerScreenStyles.errorText}>{errors.diagnosis.message}</Text>
                )}
            </View>

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
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                >
                    {isWeb ? ScrollContent : (
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            {ScrollContent}
                        </TouchableWithoutFeedback>
                    )}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}