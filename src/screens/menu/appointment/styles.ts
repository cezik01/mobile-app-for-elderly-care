import { theme } from "common/theme/theme";
import { heightPercentageToDP, widthPercentageToDP } from "helpers/dimension";
import { verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { borderRadius, colorScheme, fontSizes, fontWeights, align, flexDirection, spacing, borderWidth } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignItems: align.default,
        backgroundColor: colorScheme.light.primary.beige,
    },
    title: {
        fontSize: fontSizes.heading.h5,
        fontWeight: fontWeights.bold,
        marginBottom: spacing[5],
    },
    input: {
        height: verticalScale(50),
        borderColor: colorScheme.light.primary.lightblue,
        borderWidth: borderWidth[2],
        marginBottom: spacing[5],
        width: widthPercentageToDP('80'),
        paddingHorizontal: spacing[2],
        borderRadius: borderRadius[1],
    },
    picker: {
        height: verticalScale(60),
        marginBottom: spacing[5],
    },
    reminderItem: {
        backgroundColor: colorScheme.light.primary.greyblue,
        padding: spacing[3],
        marginVertical: spacing[2],
        marginHorizontal: spacing[4],
        borderRadius: borderRadius[1],
    },
    reminderText: {
        fontSize: fontSizes.body.b2,
        marginBottom: spacing[2],
    },
    questionMarkIcon: {
        color: 'blue',
        marginBottom: spacing[4],
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
        marginTop: verticalScale(110),
        marginLeft: spacing[2],
    },
    helpText: {
        fontSize: fontSizes.heading.h5,
        color: 'blue',
    },
    deleteText: {
        color: colorScheme.light.ascent.Error,
        fontWeight: fontWeights.bold,
        marginTop: spacing[3],
    }
});