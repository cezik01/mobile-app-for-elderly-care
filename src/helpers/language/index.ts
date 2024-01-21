import { getDeviceNativeLanguage } from 'helpers/getDeviceLanguage';
import { LanguageCodes, Languages } from 'common/constants/languages';
import { languageFromLanguageCode } from '../languageResources';

export const isLanguageCode = (data: unknown): data is LanguageCodes => {
  return !(data as string).includes('_');
};

export const getLastSelectedLanguage = (): Languages => {
  const deviceNativeLang = getDeviceNativeLanguage();

  if (isLanguageCode(deviceNativeLang)) {
    return languageFromLanguageCode[deviceNativeLang];
  }
  return deviceNativeLang as Languages;
};
