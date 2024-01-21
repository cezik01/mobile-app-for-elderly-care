import { theme } from 'common/theme/theme';
import { heightPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';

const { align, borderRadius, borderWidth, fontSizes, fontWeights, spacing, colorScheme, position, justify } = theme.components;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: colorScheme.light.primary.white,
    },
    caregiverSidebar: {
        height: heightPercentageToDP('100'),
    },
    centeredView: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
        marginTop: spacing[4],
    },
    modalView: {
        margin: 20,
        backgroundColor: colorScheme.light.primary.white,
        borderRadius: borderRadius[4],
        padding: spacing[6],
        alignItems: align.default,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: spacing[3],
        borderWidth: borderWidth[2],
        padding: spacing[2],
        width: 200,
    },
    patientProfile: {
        padding: spacing[4],
        marginTop: spacing[2],
        backgroundColor: colorScheme.light.primary.canvas,
    },
    modalContent: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
        backgroundColor: colorScheme.light.primary.white,
        padding: spacing[4],
    },
    backdrop: {
        position: position.absolute,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    centeredModalView: {
        flex: 1,
        justifyContent: justify.default,
        alignItems: align.default,
        marginTop: spacing[8],
    },
    selectPatient: {
        marginVertical: spacing[4],
        fontSize: fontSizes.body.b2,
    },
    sectionTitle: {
        fontSize: fontSizes.body.b1,
        fontWeight: fontWeights.bold,
        marginVertical: spacing[3],
    },
    item: {
        marginTop: spacing[1],
        padding: spacing[2],
        backgroundColor: '#f0f0f0',
        borderRadius: borderRadius[1],
    },
    bloodPressureItem:{
        marginTop: spacing[1],
        padding: spacing[2],
        backgroundColor: '#f0f0f0',
        borderRadius: borderRadius[1],
    },
    reminderText: {
        fontSize: fontSizes.body.b2,
        marginBottom: spacing[1],
    },
});

export default styles;
