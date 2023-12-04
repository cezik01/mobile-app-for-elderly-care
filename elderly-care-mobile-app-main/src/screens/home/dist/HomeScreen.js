"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var UserContext_1 = require("../../context/UserContext");
var native_1 = require("@react-navigation/native");
var HomeScreen = function () {
    var user = UserContext_1.useUser().user;
    var navigation = native_1.useNavigation();
    react_1.useEffect(function () {
        if (user) {
            if (user.role === 'caregiver') {
                navigation.navigate('CaregiverProfile');
            }
            else if (user.role === 'patient') {
                navigation.navigate('PatientProfile');
            }
        }
    }, [user, navigation]);
    return (react_1["default"].createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
        react_1["default"].createElement(react_native_1.Text, null, "Anasayfa")));
};
exports["default"] = HomeScreen;
