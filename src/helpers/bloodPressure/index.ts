export const determineAverageBloodPressureStatus = (systolic: number, diastolic: number) => {
    const average = (systolic + diastolic) / 2;

    if (average >= 130) {
        return 'High';
    } else if (average <= 80) {
        return 'Low';
    }
    return 'Normal';
}
