import { theme } from 'common/theme/theme';
import { StyleSheet } from 'react-native';

const { spacing, colorScheme } = theme.components;

export const styles = StyleSheet.create({
  linkText: {
    color: colorScheme.light.primary.purpleBunny[100],
    marginTop: spacing[5],
  },
});

export default styles;
