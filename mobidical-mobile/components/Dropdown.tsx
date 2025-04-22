import React from 'react';
import DropDownPicker, { DropDownPickerProps } from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import useTheme from '@/theme/useTheme';

type CustomDropDownProps<T = any> = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  items: DropDownPickerProps<T>['items'];
  placeholderKey: string;
  zIndex?: number;
  zIndexInverse?: number;
  name?: string;
};

export function CustomDropDown<T = any>({
  open,
  setOpen,
  value,
  setValue,
  items,
  placeholderKey,
  zIndex = 1000,
  zIndexInverse = 1000,
  name,
}: CustomDropDownProps<T>) {
  const { t } = useTranslation();
  const {theme} = useTheme();

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      placeholder={t(placeholderKey)}
      style={[
        styles.dropdown,
        {
          backgroundColor: theme.background,
          borderWidth: 0,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 2,
        },
      ]}
      listMode="SCROLLVIEW"
      scrollViewProps={{ nestedScrollEnabled: true }}
      zIndex={zIndex}
      zIndexInverse={zIndexInverse}
      dropDownContainerStyle={styles.dropdownContainer}
      containerStyle={{ marginBottom: 15 }}
      textStyle={{ color: theme.textPrimary }}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  dropdownContainer: {
    borderWidth: 0,
    elevation: 3,
    borderRadius: 12,
    marginTop: 4,
  },
});
