import { theme } from 'common/theme/theme';
import { heightPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, fontSizes, flexDirection, spacing, colorScheme, position, justify } = theme.components;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        zIndex: 1,
        backgroundColor: colorScheme.light.primary.beige,
    },
    bloodStatus: {
        marginVertical: spacing[2],
        color: colorScheme.light.ascent.Error,
        fontSize: fontSizes.body.b1,
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
        fontSize: fontSizes.body.b1,
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
