"use strict";
exports.__esModule = true;
var RegistrationScreen_1 = require("screens/auth/signUp/RegistrationScreen");
var LoginScreen_1 = require("screens/auth/login/LoginScreen");
var HomeScreen_1 = require("screens/home/HomeScreen");
var CaregiverProfileScreen_1 = require("screens/profiles/CaregiverProfileScreen");
var PatientProfileScreen_1 = require("screens/profiles/PatientProfileScreen");
var ProfileEditScreen_1 = require("screens/profiles/ProfileEditScreen");
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
    {
        name: 'CaregiverProfile',
        component: CaregiverProfileScreen_1["default"]
    },
    {
        name: 'PatientProfile',
        component: PatientProfileScreen_1["default"]
    },
    {
        name: 'ProfileEditScreen',
        component: ProfileEditScreen_1["default"]
    }
];
exports["default"] = appRoutes;
