import { horizontalScale, verticalScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    infoItem: {
        alignItems: 'center',
        width: horizontalScale(160),
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 2,
    },
    infoText: {
        textAlign: 'center',
        paddingVertical: 10
    },
    divider: {
        height: verticalScale(30),
        width: 1,
        backgroundColor: '#000',
        marginHorizontal: 9,
    },
});