import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { useForm, Controller } from 'react-hook-form';
import { images } from '@/theme/images';
import * as ImagePicker from 'expo-image-picker';
import { Camera, User, ArrowLeft } from 'lucide-react-native';
import { editProfilestyles } from '@/utils/styles';
import useTheme from '@/theme/useTheme';
import { colors } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import UserStore from '@/src/stores/UserStores';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

type EditProfileFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    password?: string;
    profileImage?: string;
};

export default function EditProfileScreen() {
    const { theme } = useTheme();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const { user, updateUserProfile } = useAuth() as {
        user: {
            firstName?: string;
            lastName?: string;
            email?: string;
            userType?: string;
            profileImage?: string;
        };
        updateUserProfile?: (data: EditProfileFormInputs) => Promise<void>;
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<EditProfileFormInputs>({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            userType: user?.userType || '',
            profileImage: user?.profileImage || '',
        },
    });

    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName || '');
            setValue('lastName', user.lastName || '');
            setValue('email', user.email || '');
            setValue('userType', user.userType || '');
            if (user.profileImage) {
                setProfileImage(user.profileImage);
            }
        }
    }, [user, setValue]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'We need camera roll permissions to change your profile picture');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length > 0) {
            setProfileImage(result.assets[0].uri);
            setValue('profileImage', result.assets[0].uri);

            // Mettre à jour l'image de profil dans le store MobX
            UserStore.setProfileImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'We need camera permissions to take a photo');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.length > 0) {
            setProfileImage(result.assets[0].uri);
            setValue('profileImage', result.assets[0].uri);

            // Mettre à jour l'image de profil dans le store MobX
            UserStore.setProfileImage(result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert('Profile Picture', 'Choose an option', [
            { text: 'Take Photo', onPress: takePhoto },
            { text: 'Choose from Gallery', onPress: pickImage },
            { text: 'Cancel', style: 'cancel' },
        ]);
    };

    const onSubmit = async (data: EditProfileFormInputs) => {
        setLoading(true);
        setError('');
        try {
            const updatedData = {
                ...data,
                profileImage: profileImage || undefined,
            };

            // Appel API PUT
            const response = await axios.put('http://192.168.1.19:3000/api/auth/profile', updatedData);

            if (response.status === 200) {
                Alert.alert('Success', 'Profile updated successfully!');
                // Vous pouvez aussi mettre à jour MobX ici si nécessaire
                //UserStore.setUserProfile(updatedData); 
                router.back();
            } else {
                throw new Error('Unexpected response from server.');
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Educator', value: 'Educator' },
        { label: 'Parent', value: 'Parent' },
        { label: 'Therapist', value: 'Therapist' },
    ]);

    return (
        <SafeAreaView style={[editProfilestyles.safeArea, { backgroundColor: theme.background }]}>
            <View style={[editProfilestyles.container, { backgroundColor: theme.background }]}>
                <View style={editProfilestyles.headerContainer}>
                    <TouchableOpacity style={editProfilestyles.backButton} onPress={() => router.back()}>
                        <ArrowLeft color={theme.primary} size={24} />
                    </TouchableOpacity>
                    <Text style={StyleSheet.flatten([editProfilestyles.appName, { color: theme.primary }])}>MOBIDICAL</Text>
                    <Image source={images.app_logo} style={editProfilestyles.logo} />
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <Text style={StyleSheet.flatten([editProfilestyles.pageTitle, { color: theme.textPrimary }])}>Edit Profile</Text>
                    {error ? <Text style={StyleSheet.flatten([editProfilestyles.errorText, { color: theme.error }])}>{error}</Text> : null}

                    {/* Profile Image */}
                    <View style={editProfilestyles.profileImageContainer}>
                        <TouchableOpacity onPress={showImageOptions} style={editProfilestyles.profileImage}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={editProfilestyles.userImage} />
                            ) : (
                                <User size={60} color={theme.textSecondary} style={editProfilestyles.userIcon} />
                            )}
                            <View style={editProfilestyles.imageActionButton}>
                                <Camera size={20} color={colors.palette.text200} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* First Name */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={StyleSheet.flatten([editProfilestyles.inputLabel, { color: theme.textPrimary }])}>First Name</Text>
                        <TextInput
                            name="firstName"
                            leftIcon="person"
                            control={control}
                            rules={{ required: 'First name is required' }}
                            style={editProfilestyles.inputField}
                            placeholder="Enter your first name"
                            placeholderTextColor={theme.textSecondary}
                        />
                        {errors.firstName && <Text style={StyleSheet.flatten([editProfilestyles.errorText, { color: theme.error }])}>{errors.firstName.message}</Text>}
                    </View>

                    {/* Last Name */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={StyleSheet.flatten([editProfilestyles.inputLabel, { color: theme.textPrimary }])}>Last Name</Text>
                        <TextInput
                            name="lastName"
                            leftIcon="person"
                            control={control}
                            rules={{ required: 'Last name is required' }}
                            style={editProfilestyles.inputField}
                            placeholder="Enter your last name"
                            placeholderTextColor={theme.textSecondary}
                        />
                        {errors.lastName && <Text style={StyleSheet.flatten([editProfilestyles.errorText, { color: theme.error }])}>{errors.lastName.message}</Text>}
                    </View>

                    {/* Email */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={StyleSheet.flatten([editProfilestyles.inputLabel, { color: theme.textPrimary }])}>Email</Text>
                        <TextInput
                            name="email"
                            control={control}
                            leftIcon="mail"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Enter your email"
                            placeholderTextColor={theme.textSecondary}
                            rules={{ required: 'Email is required' }}
                            style={{ ...editProfilestyles.inputField, opacity: 0.7 }}
                        />
                        <Text style={StyleSheet.flatten([editProfilestyles.noteText, { color: theme.textSecondary }])}>Email cannot be changed</Text>
                    </View>

                    {/* User Type Dropdown */}
                    <View style={[editProfilestyles.inputContainer, { zIndex: 1000 }]}>
                        <Text style={StyleSheet.flatten([editProfilestyles.inputLabel, { color: theme.textPrimary }])}>User Type</Text>
                        <Controller
                            control={control}
                            name="userType"
                            rules={{ required: 'Please select a user type' }}
                            render={({ field: { onChange, value } }) => (
                                <DropDownPicker
                                    open={open}
                                    setOpen={setOpen}
                                    items={items}
                                    setItems={setItems}
                                    value={value}
                                    setValue={onChange}
                                    placeholder="Select user type"
                                    disabled={loading}
                                    style={{ backgroundColor: theme.background, borderColor: theme.border }}
                                    dropDownContainerStyle={{ backgroundColor: theme.card, borderColor: theme.border }}
                                    textStyle={{ color: theme.textPrimary }}
                                    placeholderStyle={{ color: theme.textSecondary }}
                                />
                            )}
                        />
                        {errors.userType && (
                            <Text style={StyleSheet.flatten([editProfilestyles.errorText, { color: theme.error }])}>
                                {errors.userType.message}
                            </Text>
                        )}
                    </View>

                    <Button
                        title={loading ? 'Updating Profile...' : 'Save Changes'}
                        onPress={handleSubmit(onSubmit)}
                        style={editProfilestyles.button}
                        disabled={loading}
                    />
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
}
