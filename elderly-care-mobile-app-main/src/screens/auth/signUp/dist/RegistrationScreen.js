"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var styles_1 = require("../styles");
var AuthForm_1 = require("components/Form/AuthForm");
var AuthService_1 = require("helpers/firebaseAuth/AuthService");
var app_1 = require("firebase/app");
var react_2 = require("react");
var react_native_picker_select_1 = require("react-native-picker-select");
var styles_2 = require("../styles");
var RegistrationScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_2.useState('patient'), role = _b[0], setRole = _b[1];
    var handleRegistration = function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService_1.signUp(values.email, values.password, role)];
                case 1:
                    _a.sent();
                    navigation.navigate('Home');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof app_1.FirebaseError) {
                        errorMessage = '';
                        switch (error_1.code) {
                            case 'auth/email-already-in-use':
                                errorMessage = 'This email is already registered. Please use a different email.';
                                break;
                            case 'auth/invalid-email':
                                errorMessage = 'Please enter a valid email address.';
                                break;
                            case 'auth/weak-password':
                                errorMessage = 'Password should be at least 6 characters.';
                                break;
                            default:
                                errorMessage = 'An error occurred during registration. Please try again.';
                        }
                        react_native_1.Alert.alert('Registration Error', errorMessage);
                    }
                    else {
                        react_native_1.Alert.alert('Registration Error', 'An unexpected error occurred. Please try again.');
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(AuthForm_1["default"], { onSubmit: handleRegistration, buttonTitle: "Sign Up" },
        react_1["default"].createElement(react_native_1.View, { style: styles_1["default"].pickerContainer },
            react_1["default"].createElement(react_native_picker_select_1["default"], { onValueChange: function (value) { return setRole(value); }, items: [
                    { label: "Patient", value: "patient" },
                    { label: "Caregiver", value: "caregiver" },
                ], style: styles_2.pickerSelectStyles, value: role, useNativeAndroidPickerStyle: false })),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return navigation.navigate('Login'); } },
            react_1["default"].createElement(react_native_1.Text, { style: styles_1["default"].linkText }, "Already have an account? Click here to log in"))));
};
exports["default"] = RegistrationScreen;
