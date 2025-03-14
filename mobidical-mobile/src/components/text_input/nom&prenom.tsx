import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const NameInputScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nom :</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
                value={lastName}
                onChangeText={setLastName}
            />

            <Text style={styles.label}>Prénom :</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre prénom"
                value={firstName}
                onChangeText={setFirstName}
            />
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
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
});

export default NameInputScreen;
