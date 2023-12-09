"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var HealthMetricItem = function (_a) {
    var icon = _a.icon, label = _a.label, value = _a.value, color = _a.color;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.metricItem },
        react_1["default"].createElement(react_native_1.Text, { style: [styles.metricLabel, { color: color }] }, label),
        react_1["default"].createElement(react_native_1.Image, { source: icon, style: styles.icon }),
        react_1["default"].createElement(react_native_1.Text, { style: [styles.metricValue, { color: color }] }, value)));
};
var HealthMetrics = function (_a) {
    var bloodPressure = _a.bloodPressure, bloodSugar = _a.bloodSugar;
    var getHealthMetricColor = function (metric) {
        switch (metric) {
            case 'Normal':
                return 'green';
            case 'High':
                return 'red';
            case 'Low':
                return 'blue';
            default:
                return 'black';
        }
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.metricsContainer },
        react_1["default"].createElement(HealthMetricItem, { icon: require('../../assets/Graph.png'), label: "Blood Pressure", value: bloodPressure, color: getHealthMetricColor(bloodPressure) }),
        react_1["default"].createElement(HealthMetricItem, { icon: require('../../assets/Group.png'), label: "Blood Sugar", value: bloodSugar, color: getHealthMetricColor(bloodSugar) })));
};
var styles = react_native_1.StyleSheet.create({
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 50
    },
    metricItem: {
        alignItems: 'center',
        marginHorizontal: 10
    },
    icon: {
        width: 130,
        height: 130,
        marginVertical: 4
    },
    metricLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    metricValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    }
});
exports["default"] = HealthMetrics;
