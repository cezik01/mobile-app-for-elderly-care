import { theme } from "common/theme/theme";
import { StyleSheet } from "react-native";

const { align, fontSizes, fontWeights, justify, spacing } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: align.default,
        justifyContent: justify.default,
        padding: spacing[4],
    },
    title: {
        fontSize: fontSizes.heading.h4,
        fontWeight: fontWeights.bold,
        marginBottom: spacing[4],
    },
});