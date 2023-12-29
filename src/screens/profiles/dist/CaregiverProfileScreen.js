"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var ProfileHeader_1 = require("../../components/ProfileComponents/ProfileHeader");
var auth_1 = require("firebase/auth");
var database_1 = require("firebase/database");
var firebaseInvitations_1 = require("helpers/firebaseInvitaitons/firebaseInvitations");
var PatientProfileScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState({}), userData = _b[0], setUserData = _b[1];
    var _c = react_1.useState(''), selectedPatientId = _c[0], setSelectedPatientId = _c[1];
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
        navigation.navigate('Profile Edit Screen');
    };
    var handleNotificationsPress = function () {
        console.log('Notifications button pressed');
    };
    var handleMenuPress = function () {
        console.log('Menu button pressed');
    };
    var sendInvitationToPatient = function (patientId) {
        var auth = auth_1.getAuth();
        var currentUser = auth.currentUser;
        if (currentUser) {
            firebaseInvitations_1.sendInvitation(currentUser.uid, patientId);
        }
        else {
            console.log("User not logged in");
            // Kullanıcı giriş yapmamışsa burada uygun bir işlem yapın
        }
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.screenContainer },
        react_1["default"].createElement(ProfileHeader_1["default"], { name: userData.name || "Name ", city: userData.city || "City ", onEditPress: handleEditPress, onNotificationsPress: handleNotificationsPress, onMenuPress: handleMenuPress }),
        react_1["default"].createElement(react_native_1.Button, { title: "Send Invitation", onPress: function () { return sendInvitationToPatient(selectedPatientId); } })));
};
var styles = react_native_1.StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
exports["default"] = PatientProfileScreen;
