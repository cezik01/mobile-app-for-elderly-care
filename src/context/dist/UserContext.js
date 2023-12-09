"use strict";
exports.__esModule = true;
exports.useUser = exports.UserProvider = exports.UserContext = void 0;
var react_1 = require("react");
// Context için initial state'i tanımlayın
var initialState = {
    user: null,
    updateUser: function (user) { }
};
// UserContext'i ve içerisinde user ve updateUser fonksiyonunu oluşturun
exports.UserContext = react_1.createContext(initialState);
// UserProvider componentini oluşturun
exports.UserProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    // Kullanıcı bilgisi ve rolü güncellemek için fonksiyon
    var updateUser = function (newUser) {
        setUser(newUser);
    };
    return (react_1["default"].createElement(exports.UserContext.Provider, { value: { user: user, updateUser: updateUser } }, children));
};
// Kullanıcı bilgilerine erişim sağlayacak hook'u oluşturun
exports.useUser = function () { return react_1.useContext(exports.UserContext); };
