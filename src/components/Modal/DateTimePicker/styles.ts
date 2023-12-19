import { StyleSheet } from 'react-native';

import { theme } from 'common/theme/theme';

const { colorScheme, justify, align } = theme.components;

const styles = StyleSheet.create({
  container: {
    alignItems: align.default,
    justifyContent: justify.default,
  },
});

export default styles;
