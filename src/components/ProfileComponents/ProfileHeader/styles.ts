import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'purple',
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },
    city: {
        fontSize: 16,
        color: 'grey',
    },
    editProfileButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    editProfileText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
        marginRight: 7,
    },
    editIcon: {
        width: 20,
        height: 20,
    },
    menuIconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    menuIcon: {
        width: 20,
        height: 20,
    },
    notificationIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    notificationIcon: {
        width: 20,
        height: 20,
    },
});