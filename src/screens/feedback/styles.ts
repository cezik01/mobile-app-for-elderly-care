import { theme } from "common/theme/theme";
import { StyleSheet } from "react-native";

const { align, borderRadius, borderWidth, colorScheme, fontSizes, justify, spacing } = theme.components;

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
        padding: spacing[5],
        backgroundColor: colorScheme.light.primary.beige,
    },
    buttonText: {
        fontSize: fontSizes.body.b2,
    },
    title: {
        fontSize: fontSizes.heading.h5,
        marginBottom: spacing[6],
    },
    input: {
        width: '100%',
        borderWidth: borderWidth[2],
        padding: spacing[3],
        marginBottom: spacing[4],
        borderRadius: borderRadius[1],
    },
});