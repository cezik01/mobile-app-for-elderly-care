"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var ProfileHeader_1 = require("../../components/ProfileHeader");
var PersonalInfo_1 = require("../../components/PersonalInfo");
var HealthMetrics_1 = require("../../components/HealthMetrics");
var MenuComponent_1 = require("../../components/MenuComponent");
var auth_1 = require("firebase/auth");
var database_1 = require("firebase/database");
var PatientProfileScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState({}), userData = _b[0], setUserData = _b[1];
    react_1.useEffect(function () {
        var auth = auth_1.getAuth();
        var user = auth.currentUser;
        var db = database_1.getDatabase();
        if (user) {
            var userRef = database_1.ref(db, "users/" + user.uid);
            database_1.onValue(userRef, function (snapshot) {
                if (snapshot.exists()) {
                    setUserData(snapshot.val());
                }
                else {
                    console.log("No data available");
                }
            });
        }
    }, []);
    var handleEditPress = function () {
        navigation.navigate('ProfileEditScreen');
    };
    var handleNotificationsPress = function () {
        console.log('Notifications button pressed');
    };
    var handleMenuPress = function () {
        console.log('Menu button pressed');
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.screenContainer },
        react_1["default"].createElement(ProfileHeader_1["default"], { name: userData.name || "Name not set", city: userData.city || "City not set", onEditPress: handleEditPress, onNotificationsPress: handleNotificationsPress, onMenuPress: handleMenuPress }),
        react_1["default"].createElement(PersonalInfo_1["default"], { age: userData.age || 0, weight: userData.weight || 0, height: userData.height || 0, bloodType: userData.bloodType || "N/A" }),
        react_1["default"].createElement(HealthMetrics_1["default"], { bloodPressure: userData.bloodPressure || 'Normal', bloodSugar: userData.bloodSugar || 'Normal' }),
        react_1["default"].createElement(MenuComponent_1["default"], { onMedicationPress: function () { return console.log('Medication Pressed'); }, onAppointmentsPress: function () { return console.log('Appointments Pressed'); } })));
};
var styles = react_native_1.StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
exports["default"] = PatientProfileScreen;
