import { theme } from "common/theme/theme";
import { widthPercentageToDP } from "helpers/dimension";
import { moderateScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { borderRadius, colorScheme, fontSizes, fontWeights, justify, align, flexDirection, spacing, textAlign } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorScheme.light.primary.cream,
        justifyContent: justify.default,
    },
    menuGrid: {
        flexDirection: flexDirection.row,
        flexWrap: 'wrap',
        justifyContent: justify.spaceEvenly,
        alignItems: align.default,
        marginTop: spacing[10],
    },
    menuItem: {
        padding: spacing[4],
        alignItems: align.default,
        marginBottom: spacing[5],
    },
    iconContainer: {
        borderRadius: borderRadius[12],
        width: moderateScale(180),
        height: moderateScale(180),
        backgroundColor: colorScheme.light.primary.lightpink,
        justifyContent: justify.default,
        alignItems: align.default,
        marginBottom: spacing[4],
    },
    icon: {
        height: moderateScale(150),
        resizeMode: 'contain',
    },
    itemText: {
        textAlign: textAlign.center,
        fontSize: fontSizes.heading.h7,
        color: colorScheme.light.primary.dark[70],
        fontWeight: fontWeights.bold,
    },
    questionMarkIcon: {
        color: 'blue',
        marginRight: spacing[1],
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
        justifyContent: justify.default,
        marginTop: verticalScale(110),
    },
    helpText: {
        fontSize: fontSizes.heading.h5,
        color: 'blue',
    },
});