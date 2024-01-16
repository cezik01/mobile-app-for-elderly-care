import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    menuItem: {
        alignItems: 'center',
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
    menuText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
    },
});