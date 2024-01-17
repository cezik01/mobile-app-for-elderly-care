import { theme } from "common/theme/theme";
import { widthPercentageToDP } from "helpers/dimension";
import { StyleSheet } from "react-native";

const { align, borderRadius, borderWidth, fontSizes, fontWeights, justify, spacing, textAlign } = theme.components;

export const styles = StyleSheet.create({
    appInfo: {
        fontSize: fontSizes.heading.h6,
        marginBottom: spacing[11],
        fontStyle: 'italic',
        width: widthPercentageToDP('95'),
    },
    buttonText: {
        fontSize: fontSizes.body.b2,
    },
    screen: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
    },
    helpContainer: {
        alignItems: align.default,
    },
    mic: {
        marginTop: spacing[5],
    },
    helpText: {
        fontSize: fontSizes.body.b2,
        fontWeight: fontWeights.bold,
        textAlign: textAlign.center,
    },
    voiceButtons: {
        marginTop: spacing[5],
    }
});