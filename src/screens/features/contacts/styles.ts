import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    errorText: {
        color: 'red',
        marginRight: 'auto',
        marginLeft: 40,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '80%',
        padding: 10,
        marginVertical: 10,
    },
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 5,
    },
    title: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
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
