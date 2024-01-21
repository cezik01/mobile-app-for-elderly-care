import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { fontSizes, spacing, colorScheme } = theme.components;

export const styles = StyleSheet.create({
  linkText: {
    color: colorScheme.light.primary.purple[100],
    marginTop: spacing[5],
  },
  pickerContainer: {
    width: widthPercentageToDP('85%'),
    height: heightPercentageToDP('8%'),
    marginVertical: spacing[2],
    padding: 10,
  },
  switchContainer: {
    marginTop: spacing[7],
    width: widthPercentageToDP('85'),
  },
  changeSwitch: {
    fontSize: fontSizes.body.b2,
    color: colorScheme.light.ascent.Info,
  }
});

export default styles;
