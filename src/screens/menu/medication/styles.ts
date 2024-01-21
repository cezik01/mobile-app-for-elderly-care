import { theme } from "common/theme/theme";
import { widthPercentageToDP } from "helpers/dimension";
import { moderateScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { colorScheme, borderRadius, fontSizes, fontWeights, align, flexDirection, spacing, borderWidth, justify } = theme.components;

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: flexDirection.row,
        marginVertical: spacing[2],
    },
    title: {
        fontSize: fontSizes.heading.h5,
        marginBottom: spacing[5],
    },
    container: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
        padding: spacing[5],
        backgroundColor: colorScheme.light.primary.beige,
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
    reminderItem: {
        borderBottomWidth: borderWidth[2],
        borderBottomColor: colorScheme.light.primary.canvas,
        marginRight: spacing[3],
        width: widthPercentageToDP('75'),
        padding: spacing[3],
        backgroundColor: colorScheme.light.primary.greyblue,
        height: verticalScale(100),
        justifyContent: justify.default,
        borderRadius: borderRadius[3],
    },
    deleteText: {
        color: colorScheme.light.ascent.Error,
        fontWeight: fontWeights.bold,
        fontSize: fontSizes.body.b2,
        marginTop: "auto",
        marginBottom: spacing[5],
    },
    warningText: {
        color: colorScheme.light.ascent.Error,
        fontSize: fontSizes.body.b2,
        marginBottom: spacing[5],
        marginRight: "auto",
        marginLeft: spacing[4],
    },
    scheduleIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
        marginRight: spacing[2],
    },
    iconScheduleContainer: {
        flexDirection: flexDirection.row,
        alignItems: align.default,
        marginBottom: spacing[6],
    },
    checkIcon: {
        color: colorScheme.light.ascent.Success,
        marginTop: "auto",
        marginBottom: spacing[6],
    },
    closeIcon: {
        marginRight: spacing[2],
        color: colorScheme.light.ascent.Error,
        marginTop: "auto",
        marginBottom: spacing[6],
    },
    questionMarkIcon: {
        color: 'blue',
        marginBottom: spacing[3],
        marginRight: spacing[1],
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
        marginTop: "auto",
    },
    helpText: {
        fontSize: fontSizes.heading.h5,
        color: 'blue',
    },
    medicationInfo: {
        fontSize: fontSizes.body.b2,
    }
});