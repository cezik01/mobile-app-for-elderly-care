"use strict";
exports.__esModule = true;
var RegistrationScreen_1 = require("screens/auth/signUp/RegistrationScreen");
var LoginScreen_1 = require("screens/auth/login/LoginScreen");
var HomeScreen_1 = require("screens/home/HomeScreen");
var CaregiverProfileScreen_1 = require("screens/profiles/CaregiverProfileScreen");
var PatientProfileScreen_1 = require("screens/profiles/PatientProfileScreen");
var ProfileEditScreen_1 = require("screens/profiles/ProfileEditScreen");
var MedicationScreen_1 = require("screens/menu/MedicationScreen");
var NotificationsScreen_1 = require("screens/profiles/NotificationsScreen");
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
        name: 'Caregiver Profile',
        component: CaregiverProfileScreen_1["default"]
    },
    {
        name: 'Patient Profile',
        component: PatientProfileScreen_1["default"]
    },
    {
        name: 'Profile Edit Screen',
        component: ProfileEditScreen_1["default"]
    },
    {
        name: 'Medication Screen',
        component: MedicationScreen_1["default"]
    },
    {
        name: 'NotificationsScreen',
        component: NotificationsScreen_1["default"]
    },
];
exports["default"] = appRoutes;
