import React from 'react';
import { View, Text, TouchableOpacity, Modal} from 'react-native';
import { useTheme } from '@/theme/themeProvider'; 
import {colors} from '@/theme/colors';
import { Modalstyles }from './stylesComponents'

type LanguageModalProps = {
  visible: boolean;
  onClose: () => void;
};

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, onClose }) => {
  const { theme } = useTheme();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
  ];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={[Modalstyles.modalOverlay, { backgroundColor: colors.palette.overlay20}]}>
        <View style={[Modalstyles.modalContent, { backgroundColor: theme.card }]}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={Modalstyles.languageItem}
              onPress={() => {
                // i18n.changeLanguage(lang.code);
                onClose();
              }}
            >
              <Text style={[Modalstyles.languageText, { color: theme.textPrimary }]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};



