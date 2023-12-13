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
var auth_1 = require("firebase/auth");
var database_1 = require("firebase/database");
var native_1 = require("@react-navigation/native");
var react_native_paper_1 = require("react-native-paper");
var ProfileEditScreen = function () {
    var bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];
    var navigation = native_1.useNavigation();
    var _a = react_1.useState(''), name = _a[0], setName = _a[1];
    var _b = react_1.useState(''), surname = _b[0], setSurname = _b[1];
    var _c = react_1.useState(''), city = _c[0], setCity = _c[1];
    var _d = react_1.useState(0), age = _d[0], setAge = _d[1];
    var _e = react_1.useState(0), height = _e[0], setHeight = _e[1];
    var _f = react_1.useState(0), weight = _f[0], setWeight = _f[1];
    var _g = react_1.useState(''), bloodType = _g[0], setBloodType = _g[1];
    var _h = react_1.useState(false), visible = _h[0], setVisible = _h[1];
    var auth = auth_1.getAuth();
    var user = auth.currentUser;
    var db = database_1.getDatabase();
    react_1.useEffect(function () {
        if (user) {
            var userRef = database_1.ref(db, 'users/' + user.uid);
            database_1.onValue(userRef, function (snapshot) {
                var data = snapshot.val();
                setName(data.name);
                setSurname(data.surname);
                setCity(data.city);
                setAge(data.age);
                setHeight(data.height);
                setWeight(data.weight);
                setBloodType(data.bloodType);
            });
        }
    }, []);
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var updates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user) return [3 /*break*/, 2];
                    updates = {};
                    updates['/users/' + user.uid + '/name'] = name;
                    updates['/users/' + user.uid + '/surname'] = surname;
                    updates['/users/' + user.uid + '/city'] = city;
                    updates['/users/' + user.uid + '/age'] = age;
                    updates['/users/' + user.uid + '/height'] = height;
                    updates['/users/' + user.uid + '/weight'] = weight;
                    updates['/users/' + user.uid + '/bloodType'] = bloodType;
                    return [4 /*yield*/, database_1.update(database_1.ref(db), updates)];
                case 1:
                    _a.sent();
                    react_native_1.Alert.alert('Profile Updated', 'Your profile has been updated successfully.', [
                        { text: "OK", onPress: function () { return navigation.goBack(); } }
                    ]);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var openMenu = function () { return setVisible(true); };
    var closeMenu = function () { return setVisible(false); };
    return (react_1["default"].createElement(react_native_paper_1.Provider, null,
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.TextInput, { placeholder: "Name", value: name, onChangeText: setName }),
            react_1["default"].createElement(react_native_1.TextInput, { placeholder: "Surname", value: surname, onChangeText: setSurname }),
            react_1["default"].createElement(react_native_1.TextInput, { placeholder: "City", value: city, onChangeText: setCity }),
            react_1["default"].createElement(react_native_1.TextInput, { placeholder: "Age", value: age.toString(), onChangeText: function (text) { return setAge(parseInt(text) || 0); }, keyboardType: "numeric" }),
            react_1["default"].createElement(react_native_1.TextInput, { placeholder: "Height", value: height.toString(), onChangeText: function (text) { return setHeight(parseInt(text) || 0); }, keyboardType: "numeric" }),
            react_1["default"].createElement(react_native_1.TextInput, { placeholder: "Weight", value: weight.toString(), onChangeText: function (text) { return setWeight(parseInt(text) || 0); }, keyboardType: "numeric" }),
            react_1["default"].createElement(react_native_paper_1.Menu, { visible: visible, onDismiss: closeMenu, anchor: react_1["default"].createElement(react_native_1.Button, { onPress: openMenu, title: "Select Blood Type" }) }, bloodTypes.map(function (type, index) { return (react_1["default"].createElement(react_native_paper_1.Menu.Item, { key: index, title: type, onPress: function () { setBloodType(type); closeMenu(); } })); })),
            react_1["default"].createElement(react_native_1.Text, null,
                "Selected Blood Type: ",
                bloodType),
            react_1["default"].createElement(react_native_1.Button, { title: "Save", onPress: handleSave }))));
};
exports["default"] = ProfileEditScreen;
