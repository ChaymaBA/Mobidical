import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

const PasswordInput = () => {
    const [password, setPassword] = useState('');
    const [isSecure, setIsSecure] = useState(true);

    return (
        <View style={{ marginVertical: 10, width: '80%' }}>
            <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={isSecure} // Masque ou affiche le texte
                placeholder="Entrez votre mot de passe"
                style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    padding: 10,
                    fontSize: 16,
                }}
            />

            {/* Bouton pour afficher/masquer le mot de passe */}
            <TouchableOpacity
                onPress={() => setIsSecure(!isSecure)}
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 12,
                }}
            >
                <Text style={{ fontSize: 16 }}>{isSecure ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInput;
