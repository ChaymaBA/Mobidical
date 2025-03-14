import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);

    // Fonction de validation d'email
    const validateEmail = (text: string) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(text));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, !isValid && styles.errorInput]}
                placeholder="Entrez votre e-mail"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={validateEmail}
                value={email}
            />
            {!isValid && <Text style={styles.errorText}>Email invalide</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginVertical: 10,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});

export default EmailInput;
