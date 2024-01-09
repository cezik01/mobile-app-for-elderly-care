import * as Speech from 'expo-speech';

export const speak = (
    setIsSpeaking: (value: boolean) => void,
    setIsPaused: (value: boolean) => void,
    isSpeaking: boolean,
    isPaused: boolean,
    introductionOfApp: string = 'Giriş yaptıktan sonra karşınıza çıkan ilk ekranda kişisel bilgileriniz yer almaktadır, bu kişisel bilgileri Profili Düzenle yazısına tıklayıp çıkan sayfada düzenleyebilirsiniz. Avatar imgesine tıklayarak fotoğraf yükleyebilirsiniz. Tansiyon Girişi İçin Tıklayınız yazan yere tıklayıp, çıkan yerden tansiyon değerlerinizi, Kan Şekeri Girişi İçin Tıklayınız yazan yere tıklayıp, çıkan yerden kan şekeri değerlerinizi düzenleyebilirsiniz. Ana ekranda da girdiğiniz değerlerin durumlarını güncel olarak görebiliyorsunuz. Altta yer alan Medication yazısına tıklayarak ilaçlarınızı ve bildirimlerini düzenleyebilirsiniz, Menu yazısına tıkladığınızda çıkan ekranda ilgili yerlere gidebilirsiniz ve son olarak Appointments yazısına tıklayarak, randevularınızla ilgili işlemleri ve bildirimlerini düzenleyebilirsiniz. Ekranın sol üstünde yer alan 3 çizgiye tıklayarak, uygulama hakkında genel bilgilendirmeyi bu şekilde alabiliyorsunuz. '
) => {
    if (!isSpeaking) {
        Speech.speak(introductionOfApp, {
            onDone: () => {
                setIsSpeaking(false);
                setIsPaused(false);
            },
        });
        setIsSpeaking(true);
        setIsPaused(false);
    } else if (isPaused) {
        Speech.resume();
        setIsPaused(false);
    }
};

export const pauseSpeech = (
    isSpeaking: boolean,
    isPaused: boolean,
    setIsPaused: (value: boolean) => void
) => {
    if (isSpeaking && !isPaused) {
        Speech.pause();
        setIsPaused(true);
    }
};

export const stopSpeech = (
    setIsSpeaking: (value: boolean) => void,
    setIsPaused: (value: boolean) => void
) => {
    Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
};