"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var PersonalInfo = function (_a) {
    var age = _a.age, weight = _a.weight, height = _a.height, bloodType = _a.bloodType;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(PersonalInfoItem, { icon: require('../../assets/Age.png'), label: "Age: " + age }),
        react_1["default"].createElement(react_native_1.View, { style: styles.divider }),
        react_1["default"].createElement(PersonalInfoItem, { icon: require('../../assets/Weight.png'), label: "Weight: " + weight }),
        react_1["default"].createElement(react_native_1.View, { style: styles.divider }),
        react_1["default"].createElement(PersonalInfoItem, { icon: require('../../assets/Height.png'), label: "Height: " + height }),
        react_1["default"].createElement(react_native_1.View, { style: styles.divider }),
        react_1["default"].createElement(PersonalInfoItem, { icon: require('../../assets/BloodType.png'), label: "Blood Type: " + bloodType })));
};
var PersonalInfoItem = function (_a) {
    var icon = _a.icon, label = _a.label;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.infoItem },
        react_1["default"].createElement(react_native_1.Image, { source: icon, style: styles.icon, resizeMode: "contain" }),
        react_1["default"].createElement(react_native_1.Text, { style: styles.infoText }, label)));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    infoItem: {
        alignItems: 'center',
        marginHorizontal: 8
    },
    icon: {
        width: 30,
        height: 30,
        marginBottom: 2
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 10
    },
    divider: {
        height: 10,
        width: 1,
        backgroundColor: '#000',
        marginHorizontal: 9
    }
});
exports["default"] = PersonalInfo;
