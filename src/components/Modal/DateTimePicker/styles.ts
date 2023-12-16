import { StyleSheet } from 'react-native';

import { theme } from 'common/theme/theme';

const { colorScheme, justify, align } = theme.components;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme.light.primary.whiteBunny,
    alignItems: align.default,
    justifyContent: justify.default,
  },
});

export default styles;
