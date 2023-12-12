"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var ProfileHeader_1 = require("../../components/ProfileHeader");
var MenuComponent_1 = require("../../components/MenuComponent");
var CaregiverProfileScreen = function () {
    var handleEditPress = function () {
        // Logic for handling edit
    };
    var handleNotificationsPress = function () {
        // Logic for handling notifications 
    };
    var handleMenuPress = function () {
        // Logic for handling menu
    };
    // Define any handlers for the MenuComponent
    var handleMedicationPress = function () {
        // Logic for medication 
    };
    var handleAppointmentsPress = function () {
        // Logic for appointments
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.screenContainer },
        react_1["default"].createElement(ProfileHeader_1["default"], { name: "Caregiver Name", city: "City Name", handleEditPress: handleEditPress, onNotificationsPress: handleNotificationsPress, onMenuPress: handleMenuPress }),
        react_1["default"].createElement(MenuComponent_1["default"], { onMedicationPress: handleMedicationPress, onAppointmentsPress: handleAppointmentsPress })));
};
var styles = react_native_1.StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
exports["default"] = CaregiverProfileScreen;
