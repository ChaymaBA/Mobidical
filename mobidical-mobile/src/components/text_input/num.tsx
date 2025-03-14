import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PhoneNumberInput = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Fonction pour vérifier si le numéro de téléphone est valide
    const handleSubmit = () => {
        const phonePattern = /^[0-9]{8}$/; // Vérifie si le numéro est composé de 10 chiffres
        if (phonePattern.test(phoneNumber)) {
            setError('');
            alert('Numéro de téléphone soumis: ' + phoneNumber);
        } else {
            setError('Numéro de téléphone invalide. Il doit contenir 8 chiffres.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Entrez votre numéro de téléphone</Text>
            <TextInput
                style={styles.input}
                keyboardType="phone-pad" // Utilisation du clavier numérique adapté
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Ex: 0123456789"
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Soumettre" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
    },
});

export default PhoneNumberInput;
