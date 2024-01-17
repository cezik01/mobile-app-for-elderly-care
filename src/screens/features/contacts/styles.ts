import { theme } from "common/theme/theme";
import { StyleSheet } from "react-native";

const { align, colorScheme, fontSizes, fontWeights, flexDirection, justify, spacing } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
        paddingTop: spacing[13],
    },
    errorText: {
        color: colorScheme.light.ascent.Error,
        marginRight: 'auto',
        marginLeft: spacing[8],
    },
    input: {
        borderWidth: 1,
        width: '80%',
        padding: spacing[3],
        marginVertical: spacing[3],
    },
    contactItem: {
        flexDirection: flexDirection.row,
        justifyContent: justify.spaceBetween,
        alignItems: align.default,
        marginVertical: spacing[4],
    },
    title: {
        marginBottom: spacing[5],
        fontSize: fontSizes.heading.h5,
        fontWeight: fontWeights.bold,
        fontStyle: 'italic',
    },
    questionMarkIcon: {
        color: 'blue',
        marginRight: spacing[1],
        marginTop: "auto",
        marginBottom: spacing[5]
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
    },
    helpText: {
        fontSize: fontSizes.heading.h5,
        color: 'blue',
    },
});
