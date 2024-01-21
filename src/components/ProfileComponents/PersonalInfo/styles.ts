import { theme } from "common/theme/theme";
import { horizontalScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { align, flexDirection, fontSizes, spacing, textAlign, justify } = theme.components;

export const styles = StyleSheet.create({
    container: {
        flexDirection: flexDirection.row,
        justifyContent: justify.default,
        alignItems: align.default,
        marginTop: spacing[2],
    },
    infoItem: {
        alignItems: align.default,
        width: horizontalScale(160),
    },
    icon: {
        width: horizontalScale(60),
        height: verticalScale(35),
        marginBottom: spacing[1],
    },
    infoText: {
        textAlign: textAlign.center,
        paddingVertical: spacing[3],
        fontSize: fontSizes.body.b1,
    },
    divider: {
        height: verticalScale(30),
        width: horizontalScale(2),
        backgroundColor: '#000',
        marginHorizontal: spacing[2],
    },
});