import { theme } from 'common/theme/theme';
import { StyleSheet } from 'react-native';

const { justify, align } = theme.components;

export const styles = StyleSheet.create({
  container: {
    justifyContent: justify.default,
    alignSelf: align.default,
    height: '100%',
  },
  text: {
    alignSelf: align.default,
  },
});
