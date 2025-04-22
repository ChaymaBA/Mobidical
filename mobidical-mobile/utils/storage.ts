import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    async save(key: string, value: any): Promise<void> {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving data for key: ${key}`, error);
        }
    },

    async load(key: string): Promise<any | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error(`Error loading data for key: ${key}`, error);
            return null;
        }
    },

    async remove(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing data for key: ${key}`, error);
        }
    }
};