import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        marginBottom: 20,
    },
    reminderItem: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    reminderText: {
        fontSize: 16,
        marginBottom: 5,
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