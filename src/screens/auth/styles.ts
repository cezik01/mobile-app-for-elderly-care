import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';


const { spacing, colorScheme } = theme.components;

export const styles = StyleSheet.create({
    linkText: {
        color: colorScheme.light.primary.purpleBunny[100], 
        marginTop: spacing[5],
    },
    pickerContainer: {
      width: widthPercentageToDP('100%'), 
      height: heightPercentageToDP('8%'), 
      paddingHorizontal: spacing[3], 
      marginVertical: spacing[2], 
      backgroundColor: colorScheme.light.primary.canvasBunny, 
      color: colorScheme.light.primary.purpleBunny[100], 
      fontSize: 20,
      padding: 10, 
      borderWidth: 1, 
      borderColor: 'gray',
  },
    picker: {
        width: widthPercentageToDP('80%'), 
        height: heightPercentageToDP('8%'), 
        backgroundColor: colorScheme.light.primary.canvasBunny, 
        color: colorScheme.light.primary.darkBunny[100], 
        marginVertical: spacing[2], 
        fontSize: 20,
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black', 
      paddingRight: 30, 
      backgroundColor: 'white', 
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black', 
    },
});

export default styles;
