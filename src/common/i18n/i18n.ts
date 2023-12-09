import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationTR from './tr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  ar: {},
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'tr',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
