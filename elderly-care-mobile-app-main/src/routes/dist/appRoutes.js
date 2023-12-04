"use strict";
exports.__esModule = true;
var RegistrationScreen_1 = require("screens/auth/signUp/RegistrationScreen");
var LoginScreen_1 = require("screens/auth/login/LoginScreen");
var HomeScreen_1 = require("screens/home/HomeScreen");
var appRoutes = [
    {
        name: 'Registration',
        component: RegistrationScreen_1["default"]
    },
    {
        name: 'Login',
        component: LoginScreen_1["default"]
    },
    {
        name: 'Home',
        component: HomeScreen_1["default"]
    },
];
exports["default"] = appRoutes;
