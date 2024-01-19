import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, fontSizes, flexDirection, colorScheme, spacing, textAlign, justify } = theme.components;

export const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: flexDirection.row,
    alignItems: align.default,
  },
  passwordVisibilityIcon: {
    marginLeft: -spacing[6],
    marginBottom: spacing[4],
  },
  container: {
    flex: 1,
    justifyContent: justify.default,
    alignItems: align.default,
    padding: spacing[7],
  },
  textInput: {
    height: heightPercentageToDP('5'),
    borderColor: colorScheme.light.primary.dark[30],
    borderWidth: borderWidth[1],
    borderRadius: borderRadius[1],
    paddingHorizontal: spacing[3],
    marginBottom: spacing[4],
    width: widthPercentageToDP('80'),
  },
  forgotPasswordTextInput: {
    marginTop: spacing[10],
  },
  button: {
    backgroundColor: "blue",
    padding: spacing[4],
    borderRadius: borderRadius[2],
    width: widthPercentageToDP('80'),
    alignItems: align.default,
  },
  buttonText: {
    color: colorScheme.light.primary.bright,
    fontSize: fontSizes.body.b2,
  },
  errorText: {
    color: colorScheme.light.ascent.Error,
    marginBottom: spacing[4],
    marginRight: "auto",
    marginLeft: spacing[2]
  },
  linkText: {
    marginTop: spacing[6],
    textAlign: textAlign.center,
    color: 'blue',
  },
});

export default styles;
