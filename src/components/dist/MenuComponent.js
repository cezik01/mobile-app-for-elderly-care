"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
// Corrected MenuItem component
var MenuItem = function (_a) {
    var onPress = _a.onPress, iconName = _a.iconName, text = _a.text;
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.menuItem, onPress: onPress },
        react_1["default"].createElement(react_native_1.Image, { source: iconName, style: styles.menuIcon }),
        react_1["default"].createElement(react_native_1.Text, { style: styles.menuText }, text)));
};
var MenuComponent = function (_a) {
    var onMedicationPress = _a.onMedicationPress, onAppointmentsPress = _a.onAppointmentsPress;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.menuContainer },
        react_1["default"].createElement(MenuItem, { onPress: onMedicationPress, iconName: require('../../assets/medicationIcon.png'), text: "Medication" }),
        react_1["default"].createElement(MenuItem, { onPress: onAppointmentsPress, iconName: require('../../assets/appointmentsIcon.png'), text: "Appointments" })));
};
var styles = react_native_1.StyleSheet.create({
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
        borderTopColor: '#ddd'
    },
    menuItem: {
        alignItems: 'center'
    },
    menuIcon: {
        width: 30,
        height: 30
    },
    menuText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5
    }
});
exports["default"] = MenuComponent;
