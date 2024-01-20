import { theme } from 'common/theme/theme';
import { widthPercentageToDP, heightPercentageToDP } from 'helpers/dimension';
import { verticalScale } from 'helpers/dimension/scale';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, colorScheme, fontSizes, flexDirection, fontWeights, spacing, textAlign } = theme.components;

export const styles = StyleSheet.create({
    buttonText: {
        fontSize: fontSizes.body.b2,
    },
    chartTitle: {
        fontSize: fontSizes.heading.h5,
        fontWeight: fontWeights.bold,
        textAlign: textAlign.center,
        marginVertical: spacing[3],
    },
    container: {
        flex: 1,
        alignItems: align.default,
        paddingTop: spacing[3],
    },
    input: {
        width: widthPercentageToDP('70'),
        height: spacing[7],
        borderColor: '#6495ED',
        borderWidth: borderWidth[2],
        borderRadius: borderRadius[1],
        margin: spacing[3],
        padding: spacing[3],
    },
    warningText: {
        color: colorScheme.light.ascent.Error,
    },
    listItem: {
        backgroundColor: colorScheme.light.primary.white,
        padding: spacing[4],
        marginTop: spacing[4],
        marginHorizontal: spacing[4],
        borderRadius: borderRadius[1],
        borderWidth: borderWidth[2],
        borderColor: '#6495ED',
    },
    questionMarkIcon: {
        color: 'blue',
        marginRight: spacing[1],
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
        marginTop: spacing[3],
    },
    helpText: {
        fontSize: fontSizes.heading.h5,
        color: 'blue',
    },
    helpContainer: {
        marginTop: "auto",
        marginBottom: spacing[5],
    }
});