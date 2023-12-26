import { Dimensions } from "react-native";

export const calculateChartWidth = (numberOfDataPoints: number, minBarWidth: number = 50): number => {
    const screenWidth = Dimensions.get('window').width;
    let chartWidth = numberOfDataPoints * minBarWidth;
    if (chartWidth < screenWidth) {
        chartWidth = screenWidth;
    }
    return chartWidth;
};
