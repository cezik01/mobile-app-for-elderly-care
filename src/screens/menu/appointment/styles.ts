import { theme } from "common/theme/theme";
import { heightPercentageToDP } from "helpers/dimension";
import { verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { borderRadius, fontSizes, fontWeights, align, flexDirection, spacing, borderWidth } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing[4],
        alignItems: align.default,
    },
    title: {
        fontSize: fontSizes.heading.h5,
        fontWeight: fontWeights.bold,
        marginBottom: spacing[5],
    },
    input: {
        height: heightPercentageToDP('5'),
        borderWidth: borderWidth[2],
        marginBottom: spacing[6],
        padding: spacing[3],
        borderRadius: borderRadius[1],
    },
    picker: {
        height: verticalScale(60),
        marginBottom: spacing[5],
    },
    reminderItem: {
        backgroundColor: '#f9f9f9',
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
        marginBottom: 15,
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
});