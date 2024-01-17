import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuGrid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    menuItem: {
        width: '45%',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        borderRadius: 100,
        width: 120,
        height: 120,
        backgroundColor: '#f8d7e4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    itemText: {
        textAlign: 'center',
    },
    questionMarkIcon: {
        color: 'blue',
        marginRight: 5,
    },
    questionMarkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '20%',
        marginLeft: 5,
    },
    helpText: {
        fontSize: 20,
        color: 'blue',
    },
    contentContainer: {
        flex: 1,
    },
});