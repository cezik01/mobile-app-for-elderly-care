import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: '#6495ED',
        borderWidth: 1,
        borderRadius: 4,
        margin: 10,
        padding: 10,
    },
    warningText: {
        color: 'red',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#6495ED',
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
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