import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';


const { spacing, colorScheme } = theme.components;

export const styles = StyleSheet.create({
    linkText: {
        color: colorScheme.light.primary.purpleBunny[100], // Örnek olarak mor renk kullanıldı
        marginTop: spacing[5],
    },
    pickerContainer: {
      width: widthPercentageToDP('100%'), // Genişliği ekranın tamamına yaymak için %100 yapabilirsiniz
      height: heightPercentageToDP('8%'), // Yükseklik
      paddingHorizontal: spacing[3], // İç yatay boşluk
      marginVertical: spacing[2], // Üst ve alt dış boşluk
      backgroundColor: colorScheme.light.primary.canvasBunny, // Arka plan rengi olarak açık renk kullanıldı
      color: colorScheme.light.primary.purpleBunny[100], // Metin rengi olarak koyu renk kullanıldı
      fontSize: 20,
      
  },
    picker: {
        width: widthPercentageToDP('80%'), // Genişlik olarak ekranın %80'ini kullanır
        height: heightPercentageToDP('8%'), // Yükseklik olarak ekranın %8'ini kullanır
        backgroundColor: colorScheme.light.primary.canvasBunny, // Arka plan rengi olarak açık renk kullanıldı
        color: colorScheme.light.primary.darkBunny[100], // Metin rengi olarak koyu renk kullanıldı
        marginVertical: spacing[2], // Dikey boşluk
        fontSize: 20,
    },
});
export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    color: 'red',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    color: 'red',
    paddingRight: 30,
  },
});


export default styles;
