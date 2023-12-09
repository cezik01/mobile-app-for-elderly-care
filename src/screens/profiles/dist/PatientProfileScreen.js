"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var ProfileHeader_1 = require("../../components/ProfileHeader");
var PersonalInfo_1 = require("../../components/PersonalInfo");
var HealthMetrics_1 = require("../../components/HealthMetrics");
var MenuComponent_1 = require("../../components/MenuComponent");
var PatientProfileScreen = function () {
    var handleEditPress = function () {
        // Logic to handle edit button press, like navigating to an edit screen
    };
    var handleNotificationsPress = function () {
        console.log('Notifications button pressed');
    };
    var handleMenuPress = function () {
        console.log('Menu button pressed');
    };
    console.log(HealthMetrics_1["default"], MenuComponent_1["default"]);
    return (react_1["default"].createElement(react_native_1.View, { style: styles.screenContainer },
        react_1["default"].createElement(ProfileHeader_1["default"], { name: "Ali", city: "\u0130stanbul", onEditPress: handleEditPress, onNotificationsPress: handleNotificationsPress, onMenuPress: handleMenuPress }),
        react_1["default"].createElement(PersonalInfo_1["default"], { age: 65, weight: 70, height: 175, bloodType: "A+" }),
        react_1["default"].createElement(HealthMetrics_1["default"], { bloodPressure: "Normal", bloodSugar: "Normal" }),
        react_1["default"].createElement(MenuComponent_1["default"], { onMedicationPress: function () { return console.log('Medication Pressed'); }, onAppointmentsPress: function () { return console.log('Appointments Pressed'); } })));
};
// Define the styles for PatientProfileScreen
var styles = react_native_1.StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
exports["default"] = PatientProfileScreen;
