import React from 'react';
import { View, Text } from 'react-native';
import ButtonTest from '../src/components/button'; // Vérifie le chemin
import NomPrenomInput from '../src/components/text_input/nom&prenom'; // Vérifie le chemin
import PasswordInput from '../src/components/text_input/password';
import EmailTest from '../src/components/text_input/email';
import PhoneNumberInput from '@/src/components/text_input/num';



export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>

      {/* Ajout d'un titre */}
      <Text style={{ fontSize: 20, marginBottom: 20 }}>MOBIDICAL</Text>
      <EmailTest/>
      <PhoneNumberInput />
      <NomPrenomInput />
      <PasswordInput />
      <ButtonTest />

    </View> 
  );
}
