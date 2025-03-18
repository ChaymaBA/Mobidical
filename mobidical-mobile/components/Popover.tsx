import React, { ReactNode, useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
}

export const Popover = ({ trigger, content }: PopoverProps) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const measureTrigger = (event: any) => {
    const { pageY, pageX, height, width } = event.nativeEvent;
    setPosition({
      top: pageY + height,
      left: pageX,
    });
    setVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={(e) => measureTrigger(e)}>
        {trigger}
      </TouchableOpacity>
      
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.content,
              {
                top: position.top,
                left: position.left,
              },
            ]}
          >
            {content}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: Dimensions.get('window').width * 0.8,
  },
});