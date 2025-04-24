import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import { colors } from '@/theme/colors';
import { ChangePasswordstyles } from '@/utils/styles';
import { useAuth } from '@/navigation/AuthContext';
import { images } from '@/theme/images';

const ChangePassword = () => {
    // Form states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Loading and error state
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    /**
     * Validate the password change form.
     * Returns true if all fields are valid, false otherwise.
     */
    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!currentPassword) {
            newErrors.currentPassword = 'Le mot de passe actuel est requis';
        }

        if (!newPassword) {
            newErrors.newPassword = 'Le nouveau mot de passe est requis';
        } else if (newPassword.length < 8) {
            newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Reset form inputs and errors
     */
    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
    };

    /**
     * Handle the password change logic.
     * For now, it mocks the process with a timeout.
     * Replace with actual API call when backend is ready.
     */
    const handleChangePassword = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            Alert.alert('Succès', 'Votre mot de passe a été modifié avec succès', [
                { text: 'OK', onPress: resetForm },
            ]);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Une erreur est survenue lors du changement de mot de passe';
            Alert.alert('Erreur', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Render a labeled input with error message.
     */
    const renderInput = (
        label: string,
        placeholder: string,
        value: string,
        onChangeText: (text: string) => void,
        error?: string
    ) => (
        <View style={ChangePasswordstyles.inputContainer}>
            <Text style={ChangePasswordstyles.label}>{label}</Text>
            <TextInput
                style={[
                    ChangePasswordstyles.input,
                    error && ChangePasswordstyles.inputError,
                ]}
                placeholder={placeholder}
                secureTextEntry
                value={value}
                onChangeText={onChangeText}
            />
            {error && <Text style={ChangePasswordstyles.errorText}>{error}</Text>}
        </View>
    );

    return (
        <View style={ChangePasswordstyles.container}>
            {/* Header with logo and app name */}
            <View style={ChangePasswordstyles.headerContainer}>
                <Text style={ChangePasswordstyles.appName}>MOBIDICAL</Text>
                <Image
                    source={images.app_logo}
                    style={ChangePasswordstyles.logo}
                    resizeMode="contain"
                />
            </View>

            {/* Title */}
            <Text style={ChangePasswordstyles.titleCHP}>Changer le mot de passe</Text>

            {/* Password Fields */}
            {renderInput(
                'Mot de passe actuel',
                'Entrez votre mot de passe actuel',
                currentPassword,
                setCurrentPassword,
                errors.currentPassword
            )}
            {renderInput(
                'Nouveau mot de passe',
                'Entrez votre nouveau mot de passe',
                newPassword,
                setNewPassword,
                errors.newPassword
            )}
            {renderInput(
                'Confirmer le nouveau mot de passe',
                'Confirmez votre nouveau mot de passe',
                confirmPassword,
                setConfirmPassword,
                errors.confirmPassword
            )}

            {/* Submit Button */}
            <TouchableOpacity
                style={ChangePasswordstyles.button}
                onPress={handleChangePassword}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color={colors.palette.white} size="small" />
                ) : (
                    <Text style={ChangePasswordstyles.buttonText}>Changer le mot de passe</Text>
                )}
            </TouchableOpacity>

        </View>
    );
};

export default ChangePassword;
