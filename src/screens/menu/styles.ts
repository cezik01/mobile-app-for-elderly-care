import { theme } from "common/theme/theme";
import { widthPercentageToDP } from "helpers/dimension";
import { moderateScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { borderRadius, fontSizes, justify, align, flexDirection, spacing, textAlign } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuGrid: {
        width: widthPercentageToDP('100'),
        flexDirection: flexDirection.row,
        flexWrap: 'wrap',
        justifyContent: justify.spaceEvenly,
        alignItems: align.default,
    },
    menuItem: {
        width: widthPercentageToDP('45'),
        padding: spacing[4],
        alignItems: align.default,
        marginBottom: spacing[5],
    },
    iconContainer: {
        borderRadius: borderRadius[12],
        width: moderateScale(150),
        height: moderateScale(150),
        backgroundColor: '#f8d7e4',
        justifyContent: justify.default,
        alignItems: align.default,
        marginBottom: spacing[4],
    },
    icon: {
        height: moderateScale(100),
        resizeMode: 'contain',
    },
    itemText: {
        textAlign: textAlign.center,
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
    contentContainer: {
        flex: 1,
    },
});