import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Pressable,
    Alert
} from 'react-native';
import { router } from 'expo-router';

import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import {  ArrowLeft } from 'lucide-react-native';
import { TextInput } from '@/components/TextInput';
import useTheme from '@/theme/useTheme';
import { images } from '@/theme/images';
import { FeedBackScreenstyles } from './stylesS';

type FormData = {
    feedback: string;
};

const FeedbackScreen = () => {
    const { t } = useTranslation();
    const { theme } = useTheme();
    const styles = FeedBackScreenstyles(theme);

    const [rating, setRating] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { control, handleSubmit, setValue } = useForm<FormData>({
        defaultValues: {
            feedback: ''
        }
    });

    // Charger les données sauvegardées au chargement du composant
    useEffect(() => {
        const loadSavedFeedback = async () => {
            try {
                const savedData = await AsyncStorage.getItem('feedbackData');
                if (savedData) {
                    const parsedData = JSON.parse(savedData);

                    // Définir la note
                    if (parsedData.rating) {
                        setRating(parsedData.rating);
                    }

                    // Définir le feedback
                    if (parsedData.feedback) {
                        setValue('feedback', parsedData.feedback);
                    }
                }
            } catch (error) {
                console.error('Error loading feedback data:', error);
            }
        };

        loadSavedFeedback();
    }, [setValue]);

    const handleStarPress = (value: number) => {
        setRating(value);
    };

    const getRatingText = () => {
        switch (rating) {
            case 1:
                return t('Not Good');
            case 2:
                return t('Passable');
            case 3:
                return t('Good');
            case 4:
                return t('Very Good');
            default:
                return '';
        }
    };

    const onSubmit = async (data: FormData) => {
        if (rating === 0) {
            Alert.alert(
                t('Missing Rating'),
                t('Please select a rating before submitting'),
                [{ text: t('OK') }]
            );
            return;
        }

        setIsSubmitting(true);
        try {
            await AsyncStorage.setItem(
                'feedbackData',
                JSON.stringify({ ...data, rating }),
            );
            console.log('Feedback stored successfully');

            // Afficher un message de succès
            Alert.alert(
                t('Success'),
                t('Your feedback has been submitted successfully'),
                [{ text: t('OK') }]
            );
        } catch (error) {
            console.error('Error saving feedback:', error);
            Alert.alert(
                t('Error'),
                t('There was an error submitting your feedback'),
                [{ text: t('OK') }]
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <ArrowLeft color={theme.primary} size={24} />
                        </TouchableOpacity>
                        <Text style={[styles.appName, { color: theme.textPrimary }]}>MOBIDICAL</Text>
                        <Image source={images.app_logo} style={styles.logo} />
                    </View>

                    <Text style={[styles.title, { color: theme.textPrimary }]}>
                        {t('Provide Your Feedback')}
                    </Text>

                    <View style={styles.starRatingContainer}>
                        {[1, 2, 3, 4].map((star) => (
                            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                                <Ionicons
                                    name={star <= rating ? 'star' : 'star-outline'}
                                    size={30}
                                    color={star <= rating ? '#FFD700' : '#CCCCCC'}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.ratingText}>{getRatingText()}</Text>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                            {t('Your Comments')}
                        </Text>
                        <Controller
                            control={control}
                            name="feedback"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label={t('write Feedback')}
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={t('Enter your feedback')}
                                    multiline
                                    style={styles.inputField}
                                />
                            )}
                        />
                    </View>

                    {/* Bouton Submit repositionné dans la zone rouge */}
                    <View style={styles.midButtonContainer}>
                        <Pressable
                            style={[styles.button, isSubmitting && styles.buttonDisabled]}
                            onPress={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.buttonText}>
                                {isSubmitting ? t('Submitting...') : t('Submit')}
                            </Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        </View>
    );
};

export default FeedbackScreen;