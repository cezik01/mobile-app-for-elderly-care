import { theme } from 'common/theme/theme';
import { heightPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, fontSizes, fontWeights, spacing, justify } = theme.components;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        justifyContent: justify.default,
        alignItems: align.stretch,
    },
    inputContainer: {
        marginBottom: spacing[5],
    },
    buttonText: {
        fontSize: fontSizes.body.b2,
    },
    input: {
        borderWidth: borderWidth[2],
        padding: spacing[3],
        borderRadius: borderRadius[1],
        marginBottom: spacing[3],
    },
    label: {
        fontWeight: fontWeights.bold,
        marginBottom: spacing[2],
    },
    dropdownAnchor: {
        borderWidth: borderWidth[2],
        padding: spacing[3],
        borderRadius: borderRadius[1],
        marginBottom: spacing[3],
    },
    scrollContainer: {
        maxHeight: heightPercentageToDP('85'),
    }
});

export default styles;
