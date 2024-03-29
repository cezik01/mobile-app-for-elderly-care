"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var metro_config_1 = require("expo/metro-config");
var defaultConfig = metro_config_1.getDefaultConfig(__dirname);
exports["default"] = __assign(__assign({}, defaultConfig), { transformer: __assign(__assign({}, defaultConfig.transformer), { babelTransformerPath: require.resolve('react-native-svg-transformer') }), resolver: __assign(__assign({}, defaultConfig.resolver), { assetExts: defaultConfig.resolver.assetExts.filter(function (ext) { return ext !== 'svg'; }), sourceExts: __spreadArrays(defaultConfig.resolver.sourceExts, ['svg']) }) });
