import { theme } from "common/theme/theme";
import { moderateScale } from "helpers/dimension/scale";
import { StyleSheet } from "react-native";

const { align, borderRadius, borderWidth, colorScheme, fontSizes, fontWeights, flexDirection, position, spacing, justify } = theme.components;

export const styles = StyleSheet.create({
    headerContainer: {
        alignItems: align.default,
        justifyContent: justify.default,
        paddingTop: spacing[5],
        paddingBottom: spacing[4],
    },
    profileImage: {
        width: moderateScale(155),
        height: moderateScale(155),
        borderRadius: borderRadius[12],
        borderWidth: borderWidth[2],
        borderColor: colorScheme.light.primary.purple[20],
        marginBottom: spacing[3],
    },
    name: {
        fontSize: fontSizes.heading.h5,
        fontWeight: fontWeights.bold,
        color: 'black',
        marginBottom: spacing[2],
    },
    city: {
        fontSize: fontSizes.body.b2,
        color: 'grey',
    },
    editProfileButton: {
        position: position.absolute,
        top: spacing[7],
        right: spacing[3],
        flexDirection: flexDirection.row,
        alignItems: align.default,
    },
    editProfileText: {
        fontSize: fontSizes.body.b2,
        color: 'blue',
        textDecorationLine: 'underline',
        marginRight: spacing[2],
    },
    editIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
    },
    menuIconContainer: {
        position: position.absolute,
        top: spacing[3],
        left: spacing[3],
        zIndex: 1,
    },
    menuIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
    },
    notificationIconContainer: {
        position: position.absolute,
        top: spacing[2],
        right: spacing[3],
        zIndex: 1,
    },
    notificationIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
    },
});