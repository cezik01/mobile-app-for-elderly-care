import { theme } from 'common/theme/theme';
import { heightPercentageToDP, widthPercentageToDP } from 'helpers/dimension';
import { StyleSheet } from 'react-native';


const { spacing, colorScheme } = theme.components;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    caregiverSidebar: {
        height: '300%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
    },
    patientProfile: {
        padding: 20,
        marginTop: 10,
        backgroundColor: "#f0f0f0"
    },
    modalContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    centeredModalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    selectPatient: {
        marginVertical: 20,
        color: "blue",
        fontSize: 16,
    }, sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    reminderItem: {
        marginTop: 5,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    reminderText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default styles;
