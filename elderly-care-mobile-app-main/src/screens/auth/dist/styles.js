"use strict";
exports.__esModule = true;
exports.pickerSelectStyles = exports.styles = void 0;
var theme_1 = require("common/theme/theme");
var dimension_1 = require("helpers/dimension");
var react_native_1 = require("react-native");
var _a = theme_1.theme.components, spacing = _a.spacing, colorScheme = _a.colorScheme;
exports.styles = react_native_1.StyleSheet.create({
    linkText: {
        color: colorScheme.light.primary.purpleBunny[100],
        marginTop: spacing[5]
    },
    pickerContainer: {
        width: dimension_1.widthPercentageToDP('100%'),
        height: dimension_1.heightPercentageToDP('8%'),
        paddingHorizontal: spacing[3],
        marginVertical: spacing[2],
        backgroundColor: colorScheme.light.primary.canvasBunny,
        color: colorScheme.light.primary.purpleBunny[100],
        fontSize: 20
    },
    picker: {
        width: dimension_1.widthPercentageToDP('80%'),
        height: dimension_1.heightPercentageToDP('8%'),
        backgroundColor: colorScheme.light.primary.canvasBunny,
        color: colorScheme.light.primary.darkBunny[100],
        marginVertical: spacing[2],
        fontSize: 20
    }
});
exports.pickerSelectStyles = react_native_1.StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 4,
        color: 'red',
        paddingRight: 30
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        color: 'red',
        paddingRight: 30
    }
});
exports["default"] = exports.styles;
