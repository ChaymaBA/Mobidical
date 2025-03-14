import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native'

const App = () => {
    const [selected, setSelected] = useState<string | null>(null);

    // Liste des boutons avec les nouveaux noms
    const buttons = ['Communication', 'Interaction', 'Moto Skills', 'Game'];

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            {/* Ligne avec 4 boutons, seul un peut être actif à la fois */}
            <View style={{ flexDirection: 'row' }}>
                {buttons.map((name) => (
                    <Pressable
                        key={name}
                        onPress={() => setSelected(name)}
                        style={{
                            backgroundColor: selected === name ? 'blue' : 'white',
                            padding: 15,
                            borderRadius: 8,
                            margin: 5,
                            borderWidth: 2,
                            borderColor: 'black'
                        }}
                    >
                        <Text style={{ color: selected === name ? 'white' : 'black', fontSize: 16 }}>
                            {name}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Conteneur des boutons en bas de l'écran */}
            <View style={{
                position: 'absolute',
                bottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                paddingHorizontal: 40
            }}>
                <Pressable
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? 'gray' : 'blue',
                        padding: 15,
                        borderRadius: 8,
                        width: 120,
                        alignItems: 'center'
                    })}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>LogIN</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => ({
                        backgroundColor: pressed ? 'gray' : 'green',
                        padding: 15,
                        borderRadius: 8,
                        width: 120,
                        alignItems: 'center'
                    })}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>SignUP</Text>
                </Pressable>
            </View>

        </View>
    );
};

export default App