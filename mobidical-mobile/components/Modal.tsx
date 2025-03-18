import React, { ReactNode } from 'react';
import { Modal as RNModal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ visible, onClose, children }: ModalProps) => {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#333" />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
});