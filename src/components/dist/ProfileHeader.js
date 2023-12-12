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
var ImagePicker = require("expo-image-picker");
var native_1 = require("@react-navigation/native");
var ProfileHeader = function (_a) {
    var name = _a.name, city = _a.city, onEditPress = _a.onEditPress, onNotificationsPress = _a.onNotificationsPress, onMenuPress = _a.onMenuPress;
    var navigation = native_1.useNavigation();
    var _b = react_1.useState(null), profileImage = _b[0], setProfileImage = _b[1];
    var pickImage = function () { return __awaiter(void 0, void 0, void 0, function () {
        var permissionResult, pickerResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImagePicker.requestMediaLibraryPermissionsAsync()];
                case 1:
                    permissionResult = _a.sent();
                    if (permissionResult.granted === false) {
                        alert('Fotoğraf seçmek için izin gerekiyor!');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ImagePicker.launchImageLibraryAsync()];
                case 2:
                    pickerResult = _a.sent();
                    if (!pickerResult.canceled) {
                        setProfileImage(pickerResult.uri);
                    }
                    ;
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.headerContainer },
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.menuIconContainer, onPress: onMenuPress },
            react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/profiles/Menu.png'), style: styles.menuIcon })),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: pickImage },
            react_1["default"].createElement(react_native_1.Image, { source: profileImage !== null ? { uri: profileImage } : require('../../assets/profiles/Profile.png'), style: styles.profileImage })),
        react_1["default"].createElement(react_native_1.Text, { style: styles.name }, name),
        react_1["default"].createElement(react_native_1.Text, { style: styles.city }, city),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.editProfileButton, onPress: onEditPress },
            react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/profiles/Edit.png'), style: styles.editIcon }),
            react_1["default"].createElement(react_native_1.Text, { style: styles.editProfileText }, "Edit Profile")),
        react_1["default"].createElement(react_native_1.TouchableOpacity, { style: styles.notificationIconContainer, onPress: onNotificationsPress },
            react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/profiles/Notifications.png'), style: styles.notificationIcon }))));
};
var styles = react_native_1.StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 20
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'purple',
        marginBottom: 10
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4
    },
    city: {
        fontSize: 16,
        color: 'grey'
    },
    editProfileButton: {
        position: 'absolute',
        top: 40,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    editProfileText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline'
    },
    editIcon: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    menuIconContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1
    },
    menuIcon: {
        width: 20,
        height: 20
    },
    notificationIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1
    },
    notificationIcon: {
        width: 20,
        height: 20
    }
});
exports["default"] = ProfileHeader;
