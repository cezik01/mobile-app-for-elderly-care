import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    reminderItemText: {
        marginLeft: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        borderColor: '#007bff',
        borderWidth: 1,
        marginBottom: 20,
        width: '90%',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    reminderItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        width: '90%',
        backgroundColor: '#ffffff',
        height: 40,
        justifyContent: 'center',
        borderRadius: 5,
    },
    deleteText: {
        color: '#dc3545',
        fontWeight: 'bold',
        marginTop: 10,
    },
    warningText: {
        color: 'red',
        fontSize: 18,
        marginBottom: 20,
        marginRight: "auto",
        marginLeft: 20,
    },
    scheduleIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    iconScheduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkIcon: {
        color: '#28a745',
    },
    closeIcon: {
        marginRight: 10,
        color: '#dc3545',
    },
    questionMarkIcon: {
        color: 'blue',
        marginRight: 5,
        marginBottom: 15,
    },
    questionMarkContainer: {
        flexDirection: 'row',
        marginTop: '20%',
        marginLeft: 5,
    },
    helpText: {
        fontSize: 20,
        color: 'blue',
    },
});