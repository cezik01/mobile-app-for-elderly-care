import { theme } from 'common/theme/theme';
import { StyleSheet } from 'react-native';

const { justify, align } = theme.components;

export const styles = StyleSheet.create({
  title: {
    flex: 1,
    justifyContent: justify.default,
    alignItems: align.default,
  },
});
