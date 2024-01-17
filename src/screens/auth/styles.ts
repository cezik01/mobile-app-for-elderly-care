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
});

export default styles;
