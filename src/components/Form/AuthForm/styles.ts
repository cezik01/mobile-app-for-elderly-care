import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, fontSizes, flexDirection, colorScheme, spacing, justify } = theme.components;

export const styles = StyleSheet.create({
    passwordContainer:{
      flexDirection:flexDirection.row,
      alignItems: align.default,
    },
    passwordVisibilityIcon:{
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
      borderColor: colorScheme.light.primary.darkBunny[30],
      borderWidth: borderWidth[1],
      borderRadius: borderRadius[1],
      paddingHorizontal: spacing[3],
      marginBottom: spacing[4],
      width: widthPercentageToDP('80'),
    },
    button: {
      backgroundColor: "blue",
      padding: spacing[4],
      borderRadius: borderRadius[2],
      width: widthPercentageToDP('80'),
      alignItems: align.default,
    },
    buttonText: {
      color: colorScheme.light.primary.brightBunny,
      fontSize: fontSizes.body.b2,
    },
    errorText: {
      color: 'red',
      marginBottom: spacing[4],
      marginRight:"auto",
      marginLeft:spacing[2]
    },
  });

  export default styles;
