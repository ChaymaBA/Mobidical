import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Pressable,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ArrowLeft } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useTheme from '@/theme/useTheme';
import { images } from '@/theme/images';
import { TextInput } from '@/components/TextInput';
import { FeedBackScreenstyles } from './stylesS'; 
import { colors } from '@/theme';

// 🧾 Définition du type du formulaire
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
            feedback: '',
        },
    });

    // 📦 Charger les données sauvegardées (AsyncStorage)
    useEffect(() => {
        const loadSavedFeedback = async () => {
            try {
                const savedData = await AsyncStorage.getItem('feedbackData');
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    if (parsed.rating) setRating(parsed.rating);
                    if (parsed.feedback) setValue('feedback', parsed.feedback);
                }
            } catch (error) {
                console.error('Error loading feedback data:', error);
            }
        };
        loadSavedFeedback();
    }, [setValue]);

    // ⭐ Gestion du clic sur les étoiles
    const handleStarPress = (value: number) => {
        setRating(value);
    };

    // 📝 Traduction du score en texte
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

    // ✅ Envoi du feedback
    const onSubmit = async (data: FormData) => {
        if (rating === 0) {
            Alert.alert(t('Missing Rating'), t('Please select a rating before submitting'), [
                { text: t('OK') },
            ]);
            return;
        }

        setIsSubmitting(true);
        try {
            await AsyncStorage.setItem('feedbackData', JSON.stringify({ ...data, rating }));
            Alert.alert(t('Success'), t('Your feedback has been submitted successfully'), [
                { text: t('OK') },
            ]);
        } catch (error) {
            console.error('Error saving feedback:', error);
            Alert.alert(t('Error'), t('There was an error submitting your feedback'), [
                { text: t('OK') },
            ]);
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

                    <View style={styles.starRatingContainer}>
                        {[1, 2, 3, 4].map((star) => (
                            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                                <Ionicons
                                    name={star <= rating ? 'star' : 'star-outline'}
                                    size={30}
                                    color={star <= rating ? colors.palette.owlBeak :colors.palette.white }
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

                    {/* 🚀 Bouton d'envoi */}
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
