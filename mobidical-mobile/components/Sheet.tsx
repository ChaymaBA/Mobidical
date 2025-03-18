import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

interface SheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  onChange?: (index: number) => void;
}

export const Sheet = ({
  children,
  snapPoints = ['25%', '50%', '75%'],
  onChange,
}: SheetProps) => {
  const snapPointsArray = useMemo(() => snapPoints, []);

  const handleSheetChanges = useCallback((index: number) => {
    onChange?.(index);
  }, [onChange]);

  return (
    <BottomSheet
      snapPoints={snapPointsArray}
      onChange={handleSheetChanges}
      enablePanDownToClose
    >
      <View style={styles.contentContainer}>
        {children}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});