import { theme } from 'common/theme/theme';
import { StyleSheet } from 'react-native';

const { align, colorScheme, display, flexDirection, spacing, justify } = theme.components;

export const styles = StyleSheet.create({
  tabBar: {
    display: display.flex,
    flexDirection: flexDirection.row,
    justifyContent: justify.spaceAround,
    backgroundColor: colorScheme.light.primary.white,
    shadowColor: '#2E1D5F',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    alignItems: align.default,
    marginBottom: spacing[6],
    marginVertical: spacing[5],
  },
});
