import { theme } from 'common/theme/theme';
import { heightPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, colorScheme, fontSizes, fontWeights, spacing, justify } = theme.components;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        justifyContent: justify.default,
        alignItems: align.stretch,
        backgroundColor: colorScheme.light.primary.beige,
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
        borderColor: colorScheme.light.primary.lightblue,
    },
    label: {
        fontWeight: fontWeights.bold,
        marginBottom: spacing[2],
        fontSize: fontSizes.body.b2,
    },
    dropdownAnchor: {
        borderWidth: borderWidth[2],
        padding: spacing[3],
        borderRadius: borderRadius[1],
        marginBottom: spacing[3],
        borderColor: colorScheme.light.primary.lightblue,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: colorScheme.light.primary.beige,
    }
});

export default styles;
