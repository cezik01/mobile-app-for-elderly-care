import { Resource } from 'i18next';
import { LanguageCodes, Languages } from 'common/constants/languages';
import enJSON from "common/i18n/en/translation.json";
import trJSON from "common/i18n/tr/translation.json";

export const languageResources: Resource = {
    [Languages.en]: {
        translation: enJSON,
    },
    [Languages.tr]: {
        translation: trJSON,
    },
};

export const languageFromLanguageCode = {
    [LanguageCodes.en]: Languages.en,
    [LanguageCodes.tr]: Languages.tr,
};

export const languageCodeFromLanguage = {
    [Languages.en]: LanguageCodes.en,
    [Languages.tr]: LanguageCodes.tr,
};
