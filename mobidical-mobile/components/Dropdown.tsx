import React from 'react'
import DropDownPicker, {
  ValueType,
  ItemType,
} from 'react-native-dropdown-picker'
import { useTranslation } from 'react-i18next'
import useTheme from '@/theme/useTheme'
import { dropdownstyles } from './stylesComponents'

// 🔧 Contraindre T à être un ValueType (string | number | boolean)
type CustomDropDownProps<T extends ValueType> = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  value: T | null
  setValue: React.Dispatch<React.SetStateAction<T | null>>
  items: ItemType<T>[]
  placeholderKey: string
  zIndex?: number
  zIndexInverse?: number
  name?: string
}

export function CustomDropDown<T extends ValueType>({
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
  const { t } = useTranslation()
  const { theme } = useTheme()
  
  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      placeholder={t(placeholderKey)}
      style={[
        dropdownstyles.dropdown,
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
      dropDownContainerStyle={dropdownstyles.dropdownContainer}
      containerStyle={{ marginBottom: 15 }}
      textStyle={{ color: theme.textPrimary }}
    />
  )
}

