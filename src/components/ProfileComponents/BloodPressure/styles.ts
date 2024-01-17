import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, colorScheme, fontSizes, flexDirection, fontWeights, spacing, textAlign } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: align.default,
        paddingTop: spacing[3],
    },
    buttonText: {
        fontSize: fontSizes.body.b2,
    },
    input: {
        width: widthPercentageToDP('70'),
        height: heightPercentageToDP('4'),
        borderColor: '#6495ED',
        borderWidth: borderWidth[2],
        borderRadius: borderRadius[1],
        margin: spacing[2],
        padding: spacing[2],
    },
    warningText: {
        color: colorScheme.light.ascent.Error,
        marginRight: "auto",
        marginLeft: spacing[10]
    },
    listItem: {
        backgroundColor: colorScheme.light.primary.white,
        padding: spacing[5],
        marginTop: spacing[4],
        marginHorizontal: spacing[4],
        borderRadius: borderRadius[1],
        borderWidth: borderWidth[2],
        borderColor: '#6495ED',
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: fontWeights.bold,
        textAlign: textAlign.center,
        marginVertical: spacing[2],
    },
    questionMarkIcon: {
        color: 'blue',
        marginRight: spacing[1],
        marginBottom: spacing[5],
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
    },
    helpText: {
        fontSize: fontSizes.heading.h5,
        color: 'blue',
    },
});