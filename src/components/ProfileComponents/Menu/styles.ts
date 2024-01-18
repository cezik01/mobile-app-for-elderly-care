import { theme } from "common/theme/theme";
import { horizontalScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { align, borderWidth, colorScheme, fontSizes, flexDirection, position, spacing, textAlign, justify } = theme.components;

export const styles = StyleSheet.create({
    menuContainer: {
        position: position.absolute,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: flexDirection.row,
        justifyContent: justify.spaceAround,
        alignItems: align.default,
        padding: spacing[2],
        backgroundColor: colorScheme.light.primary.white,
        borderTopWidth: borderWidth[2],
        borderTopColor: '#ddd',
    },
    menuItem: {
        alignItems: align.default,
    },
    menuIcon: {
        width: horizontalScale(60),
        height: verticalScale(40),
    },
    menuText: {
        fontSize: fontSizes.heading.h5,
        textAlign: textAlign.center,
        marginTop: spacing[1],
    },
});