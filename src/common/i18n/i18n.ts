import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { save } from 'helpers/storage';
import { getLastSelectedLanguage } from 'helpers/language';
import { languageResources } from 'helpers/languageResources';
import { Languages } from 'common/constants/languages';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const lastSelectedLang = getLastSelectedLanguage();
    callback(lastSelectedLang);
  },
  init: () => { },
  cacheUserLanguage: (lng: string) => {
    save('language', lng);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    react: {
      useSuspense: false,
    },
    resources: languageResources,
    fallbackLng: Languages.tr,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
