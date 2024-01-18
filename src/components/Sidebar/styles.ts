import { theme } from 'common/theme/theme';
import { horizontalScale, moderateScale, verticalScale } from 'helpers/dimension/scale';
import { StyleSheet } from 'react-native';

const { colorScheme, fontSizes, flexDirection, position, spacing } = theme.components;

export const styles = StyleSheet.create({
    sidebar: {
        position: position.absolute,
        left: 0,
        top: 0,
        bottom: 0,
        width: horizontalScale(360),
        minHeight: verticalScale(915),
        backgroundColor: '#004d99',
        opacity: 0.95,
        zIndex: 2,
    },
    backdrop: {
        position: position.absolute,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    menuIconContainer: {
        top: spacing[3],
        left: spacing[3],
        zIndex: 1,
        backgroundColor: '#004d99',
        marginLeft: "auto",
        marginRight: spacing[5],
    },
    menuIcon: {
        width: moderateScale(35),
        height: moderateScale(35),
    },
    logoutText: {
        color: colorScheme.light.primary.white,
        marginTop: verticalScale(250),
        textDecorationLine: 'underline',
        fontSize: fontSizes.body.b1,
        fontStyle: 'italic',
        marginLeft: "auto",
        marginRight: spacing[3],
    },
    questionMarkIcon: {
        color: '#fff',
        marginRight: spacing[1],
    },
    questionMarkContainer: {
        flexDirection: flexDirection.row,
        marginTop: spacing[7],
        marginLeft: spacing[1],
    },
    helpText: {
        color: colorScheme.light.primary.white,
        fontSize: 20,
    },
    infoText: {
        color: colorScheme.light.primary.white,
        fontSize: fontSizes.heading.h5,
        marginTop: spacing[5],
        marginLeft: spacing[1],
    },
    feedbackText: {
        color: colorScheme.light.primary.white,
        fontSize: fontSizes.heading.h5,
    },
    feedbackContainer: {
        flexDirection: flexDirection.row,
        marginTop: spacing[11],
    },
    feedbackIcon: {
        color: colorScheme.light.primary.white,
        marginRight: spacing[1],
    },
});
