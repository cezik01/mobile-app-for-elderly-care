export const determineAverageBloodSugarStatus = (level: number) => {
    if (level < 70) {
        return 'Low';
    } else if (level >= 70 && level <= 140) {
        return 'Normal';
    } else if (level > 140 && level <= 200) {
        return 'High';
    } else {
        return 'Very High';
    }
}
