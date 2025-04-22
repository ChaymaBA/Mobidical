// components/DatePicker.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from '@/components/CustomText';
import { colors } from '@/theme/colors';
import { Ionicons } from '@expo/vector-icons'; // Assure-toi que ce package est installé

interface DatePickerProps {
    name: string;
    control: any;
    rules?: object;
    placeholder?: string;
    style?: object;
    disabled?: boolean;
    maximumDate?: Date;
    minimumDate?: Date;
    leftIcon?: string; // ← ici
}

export const DatePicker = ({
    name,
    control,
    rules,
    placeholder = 'Select date',
    style,
    disabled = false,
    maximumDate,
    minimumDate,
    leftIcon, // ← ici
}: DatePickerProps) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, value } }) => {
                const onDateChange = (event: any, selectedDate?: Date) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (selectedDate) {
                        onChange(formatDate(selectedDate));
                    }
                };

                return (
                    <View>
                        <TouchableOpacity
                            style={[styles.container, style]} // ← utilise styles
                            onPress={() => setShowDatePicker(true)}
                            disabled={disabled}
                        >
                            {leftIcon && (
                                <Ionicons name={leftIcon as any} size={20} color={colors.palette.text100} style={styles.icon} />
                            )}
                            <Text style={{ color: value ? colors.palette.text200 : colors.palette.text200 }}>
                                {value || placeholder}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={value ? new Date(value) : new Date()}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                maximumDate={maximumDate}
                                minimumDate={minimumDate}
                            />
                        )}
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        padding: 10,
        borderRadius: 8,
    },
    icon: {
        marginRight: 10,
    },
});
