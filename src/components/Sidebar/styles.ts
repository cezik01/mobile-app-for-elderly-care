import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 200,
        height: '90.5%',
        backgroundColor: '#004d99',
        opacity: 0.95,
        zIndex: 2,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    menuIconContainer: {
        top: 10,
        left: 10,
        zIndex: 1,
        backgroundColor: '#004d99',
        marginLeft: "auto",
        marginRight: 20,
    },
    menuIcon: {
        width: 25,
        height: 25,
    },
    logoutText: {
        color: '#fff',
        marginTop: '100%',
        textDecorationLine: 'underline',
        fontSize: 18,
        fontStyle: 'italic',
        marginLeft: "auto",
        marginRight: 10,
    },
    questionMarkIcon: {
        color: '#fff',
        marginRight: 5,
    },
    questionMarkContainer: {
        flexDirection: 'row',
        marginTop: '20%',
        marginLeft: 5,
    },
    helpText: {
        color: '#fff',
        fontSize: 20,
    },
    helpInfoText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 5,
    },
    feedbackText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 100,
        marginLeft: 5,
    },
});
