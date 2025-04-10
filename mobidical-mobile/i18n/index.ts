import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './demo-en';
import translationFR from './demo-fr';

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    },
};

i18n
    .use(initReactI18next) // passe i18n à react-i18next
    .init({
        resources,
        lng: 'fr', // langue par défaut
        fallbackLng: 'en', // langue de secours

        interpolation: {
            escapeValue: false // non nécessaire pour React
        },

        // Options supplémentaires
        react: {
            useSuspense: false, // recommandé pour React Native
        }
    });

export default i18n;