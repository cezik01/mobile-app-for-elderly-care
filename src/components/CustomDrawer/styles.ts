import { StyleSheet } from 'react-native';
import { theme } from 'common/theme/theme';

const {
    spacing,
    justify,
    align,
    flexDirection,
} = theme.components;

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: flexDirection.row,
        alignItems: align.default,
        justifyContent: justify.default,
        paddingVertical: spacing[4],
    },
    switch: {
        marginHorizontal: spacing[4],
    },
});

export default styles;
