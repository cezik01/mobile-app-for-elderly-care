import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { fontSizes, spacing, colorScheme } = theme.components;

export const styles = StyleSheet.create({
  linkText: {
    color: "blue",
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
  }
});

export default styles;
