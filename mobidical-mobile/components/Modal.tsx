import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/themeProvider'; 
// import { i18n } from '@/i18n/i18n';
import {colors} from '@/theme/colors';

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
      <View style={[styles.modalOverlay, { backgroundColor: colors.palette.overlay20}]}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.languageItem}
              onPress={() => {
                // i18n.changeLanguage(lang.code);
                onClose();
              }}
            >
              <Text style={[styles.languageText, { color: theme.textPrimary }]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  languageItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor:colors.palette.white ,
  },
  languageText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LanguageModal;
