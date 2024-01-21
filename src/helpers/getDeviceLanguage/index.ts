import { Platform, NativeModules } from 'react-native';

export const getDeviceNativeLanguage = (withRegionCode = true): string => {
    let lang;
    if (Platform.OS === 'android') {
        lang = NativeModules.I18nManager.localeIdentifier;
    } else if (Platform.OS === 'ios') {
        lang =
            NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0];
    } else {
        lang = 'en';
    }
    if (!withRegionCode) {
        return lang.split('_')[0];
    }
    return lang;
};
