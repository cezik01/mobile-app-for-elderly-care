import { theme } from "common/theme/theme";
import { widthPercentageToDP } from "helpers/dimension";
import { moderateScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { colorScheme, borderRadius, fontSizes, fontWeights, align, flexDirection, spacing, borderWidth, justify } = theme.components;

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: flexDirection.row,
        marginBottom: spacing[5],
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
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: verticalScale(50),
        borderColor: '#007bff',
        borderWidth: borderWidth[2],
        marginBottom: spacing[5],
        width: widthPercentageToDP('80'),
        paddingHorizontal: spacing[2],
        borderRadius: borderRadius[1],
    },
    reminderItem: {
        flexDirection: flexDirection.row,
        borderBottomWidth: borderWidth[2],
        borderBottomColor: colorScheme.light.primary.canvas,
        marginRight: spacing[3],
        width: widthPercentageToDP('80'),
        backgroundColor: colorScheme.light.primary.white,
        height: verticalScale(50),
        justifyContent: justify.default,
        borderRadius: borderRadius[1],
    },
    deleteText: {
        color: '#dc3545',
        fontWeight: fontWeights.bold,
        marginTop: spacing[3],
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
        marginBottom: spacing[5],
    },
    checkIcon: {
        color: '#28a745',
    },
    closeIcon: {
        marginRight: spacing[2],
        color: '#dc3545',
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
});