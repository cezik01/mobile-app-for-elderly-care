"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_stack_1 = require("@react-navigation/native-stack");
var appRoutes_1 = require("routes/appRoutes");
var Stack = native_stack_1.createNativeStackNavigator();
function AppNavigation() {
    return (react_1["default"].createElement(Stack.Navigator, { initialRouteName: "Registration" }, appRoutes_1["default"].map(function (route, index) { return (react_1["default"].createElement(Stack.Screen, { key: index, name: route.name, component: route.component })); })));
}
exports["default"] = AppNavigation;
