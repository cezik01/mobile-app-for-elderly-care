import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, fontSizes, flexDirection, spacing, colorScheme, position, justify } = theme.components;

const styles = StyleSheet.create({
    bloodStatus: {
        marginVertical: spacing[2],
        color: colorScheme.light.ascent.Error,
        fontSize: fontSizes.body.b2,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: colorScheme.light.primary.white,
        zIndex: 1,
    },
    scrollView: {
        maxHeight: heightPercentageToDP('80'),
        zIndex: 1,
    },
    bloodPressureSugarImage: {
        alignSelf: align.default,
    },
    bloodSugarPressure: {
        flexDirection: flexDirection.column,
        justifyContent: justify.spaceBetween,
        alignItems: align.default,
    },
    bloodSugar: {
        marginTop: spacing[7],
    },
    bloodPressureSugarTexts: {
        marginTop: spacing[5],
        color: 'blue',
    },
    backdrop: {
        position: position.absolute,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    dimmedBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

});
export default styles;
