import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Image,
} from 'react-native';
import { colors } from '@/theme/colors';
import ChangePasswordstyles from '@/utils/styles'
import { useAuth } from '@/navigation/AuthContext';
import { images } from '@/theme/images';

 
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({});

    const validateForm = () => {
        const newErrors: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};

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

    const handleChangePassword = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            // Simuler un appel API pour changer le mot de passe
            // Dans un cas réel, vous feriez un appel à votre backend
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Exemple d'appel API
            // const response = await fetch('https://api.example.com/change-password', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': 'Bearer YOUR_AUTH_TOKEN'
            //   },
            //   body: JSON.stringify({
            //     currentPassword,
            //     newPassword
            //   })
            // });
            // const data = await response.json();
            // if (!response.ok) throw new Error(data.message);

            Alert.alert(
                'Succès',
                'Votre mot de passe a été modifié avec succès',
                [{ text: 'OK', onPress: () => resetForm() }]
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors du changement de mot de passe';
            Alert.alert('Erreur', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrors({});
    };

    return (
        <View style={ChangePasswordstyles.container}>
            {/* Header avec logo et nom de l'application */}
            <View style={ChangePasswordstyles.headerContainer}>
                <Text style={ChangePasswordstyles.appName}>MOBIDICAL</Text>
                <Image
                    source={images.app_logo}
                    style={ChangePasswordstyles.logo}
                    resizeMode="contain"
                />
            </View>

            <Text style={ChangePasswordstyles.title}>Changer le mot de passe</Text>

            <View style={ChangePasswordstyles.inputContainer}>
                <Text style={ChangePasswordstyles.label}>Mot de passe actuel</Text>
                <TextInput
                    style={[ChangePasswordstyles.input, errors.currentPassword && ChangePasswordstyles.inputError]}
                    placeholder="Entrez votre mot de passe actuel"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                {errors.currentPassword && (
                    <Text style={ChangePasswordstyles.errorText}>{errors.currentPassword}</Text>
                )}
            </View>

            <View style={ChangePasswordstyles.inputContainer}>
                <Text style={ChangePasswordstyles.label}>Nouveau mot de passe</Text>
                <TextInput
                    style={[ChangePasswordstyles.input, errors.newPassword && ChangePasswordstyles.inputError]}
                    placeholder="Entrez votre nouveau mot de passe"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                {errors.newPassword && (
                    <Text style={ChangePasswordstyles.errorText}>{errors.newPassword}</Text>
                )}
            </View>

            <View style={ChangePasswordstyles.inputContainer}>
                <Text style={ChangePasswordstyles.label}>Confirmer le nouveau mot de passe</Text>
                <TextInput
                    style={[ChangePasswordstyles.input, errors.confirmPassword && ChangePasswordstyles.inputError]}
                    placeholder="Confirmez votre nouveau mot de passe"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                {errors.confirmPassword && (
                    <Text style={ChangePasswordstyles.errorText}>{errors.confirmPassword}</Text>
                )}
            </View>

            <TouchableOpacity
                style={ChangePasswordstyles.button}
                onPress={handleChangePassword}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                ) : (
                    <Text style={ChangePasswordstyles.buttonText}>Changer le mot de passe</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};
