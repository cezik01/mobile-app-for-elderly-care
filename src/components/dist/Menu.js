"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Menu = function (_a) {
    var onMedicationPress = _a.onMedicationPress, onAppointmentsPress = _a.onAppointmentsPress;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.menuContainer },
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.menuItem, onPress: onMedicationPress },
            react_1["default"].createElement(react_native_1.Text, { style: styles.menuText }, "Medication Reminders")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.menuItem, onPress: onAppointmentsPress },
            react_1["default"].createElement(react_native_1.Text, { style: styles.menuText }, "Appointments"))));
};
var styles = react_native_1.StyleSheet.create({
    menuContainer: {
    // Style your menu container
    },
    menuItem: {
        // Style your menu item (buttons)
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#efefef',
        alignItems: 'center',
        borderRadius: 5
    },
    menuText: {
        // Style your menu text
        fontSize: 16
    }
});
exports["default"] = Menu;
