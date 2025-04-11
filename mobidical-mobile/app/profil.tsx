import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/navigation/AuthContext';
import { TextInput } from '@/components/TextInput';
import { Button } from '@/components/Button';
import { Text } from '@/components/CustomText';
import { useForm, Controller } from 'react-hook-form';
import { images } from '@/theme/images';
import { colors } from '@/theme/colors';
import { RadioButton } from '@/components/RadioButton';
import { validateEmail } from '@/utils/validation';
import * as ImagePicker from 'expo-image-picker';
import { Camera, User } from 'lucide-react-native';
import { editProfilestyles } from '@/utils/styles';

// Define the form input types
type EditProfileFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    userType: string;
    password?: string;
    profileImage?: string;
};

export default function EditProfileScreen() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const { user, updateUserProfile } = useAuth() as { user: { firstName?: string; lastName?: string; email?: string; userType?: string; profileImage?: string }; updateUserProfile?: (data: EditProfileFormInputs) => Promise<void> };

    const userTypeOptions = ['Educator', 'Parent', 'Therapist'];

    // Set up React Hook Form
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<EditProfileFormInputs>({
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            email: user?.email || '',
            userType: user?.userType || '',
            profileImage: user?.profileImage || '',
        }
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

    // Image picking functionality
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
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
            setValue('profileImage', result.assets[0].uri);
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
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri);
            setValue('profileImage', result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert(
            'Profile Picture',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: takePhoto },
                { text: 'Choose from Gallery', onPress: pickImage },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const onSubmit = async (data: EditProfileFormInputs) => {
        setLoading(true);
        try {
            const updatedData = {
                ...data,
                profileImage: profileImage || undefined,
            };

            if (updateUserProfile) {
                await updateUserProfile(updatedData);
                Alert.alert('Success', 'Profile updated successfully!');
                router.back();
            } else {
                console.error('updateUserProfile is undefined');
                Alert.alert('Error', 'Unable to update profile at this time.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={editProfilestyles.safeArea}>
            <View style={editProfilestyles.container}>
                <View style={editProfilestyles.headerContainer}>
                    <TouchableOpacity style={editProfilestyles.backButton} onPress={() => router.back()}>
                        <Text style={editProfilestyles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={editProfilestyles.appName}>MOBIDICAL</Text>
                    <Image source={images.app_logo} style={editProfilestyles.logo} />
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <Text style={editProfilestyles.pageTitle}>Edit Profile</Text>

                    {error ? <Text style={editProfilestyles.errorText}>{error}</Text> : null}

                    {/* Profile Image */}
                    <View style={editProfilestyles.profileImageContainer}>
                        <TouchableOpacity onPress={showImageOptions} style={editProfilestyles.profileImage}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={editProfilestyles.userImage} />
                            ) : (
                                <User size={60} color={colors.palette.text200} style={editProfilestyles.userIcon} />
                            )}
                            <View style={editProfilestyles.imageActionButton}>
                                <Camera size={20} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* First Name */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={editProfilestyles.inputLabel}>First Name</Text>
                        <TextInput
                            name="firstName"
                            control={control}
                            rules={{ required: 'First name is required' }}
                            style={editProfilestyles.inputField}
                            placeholder="Enter your first name"
                            placeholderTextColor={colors.palette.text100}
                        />
                        {errors.firstName && <Text style={editProfilestyles.errorText}>{errors.firstName.message}</Text>}
                    </View>

                    {/* Last Name */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={editProfilestyles.inputLabel}>Last Name</Text>
                        <TextInput
                            name="lastName"
                            control={control}
                            rules={{ required: 'Last name is required' }}
                            style={editProfilestyles.inputField}
                            placeholder="Enter your last name"
                            placeholderTextColor={colors.palette.text100}
                        />
                        {errors.lastName && <Text style={editProfilestyles.errorText}>{errors.lastName.message}</Text>}
                    </View>

                    {/* Email */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={editProfilestyles.inputLabel}>Email</Text>
                        <TextInput
                            name="email"
                            control={control}
                            leftIcon="mail"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Enter your email"
                            placeholderTextColor={colors.palette.text100}
                            rules={{
                                required: 'Email is required',
                                validate: validateEmail,
                            }}
                            editable={false}
                            style={{ ...editProfilestyles.inputField, opacity: 0.7 }}
                        />
                        <Text style={editProfilestyles.noteText}>Email cannot be changed</Text>
                    </View>

                    {/* User Type */}
                    <View style={editProfilestyles.inputContainer}>
                        <Text style={editProfilestyles.inputLabel}>User Type</Text>
                        <Controller
                            control={control}
                            name="userType"
                            rules={{ required: 'Please select a user type' }}
                            render={({ field: { onChange, value } }) => (
                                <RadioButton options={userTypeOptions} value={value} onChange={onChange} disabled={loading} />
                            )}
                        />
                        {errors.userType && <Text style={editProfilestyles.errorText}>{errors.userType.message}</Text>}
                    </View>

                    <Button
                        title={loading ? 'Updating Profile...' : 'Save Changes'}
                        onPress={handleSubmit(onSubmit)}
                        style={editProfilestyles.button}
                        disabled={loading}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
