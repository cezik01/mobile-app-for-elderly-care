export const determineAverageBloodPressureStatus = (systolic: number, diastolic: number) => {
    const average = (systolic + diastolic) / 2;

    if (average >= 130) {
        return 'HIGH';
    } else if (average <= 80) {
        return 'LOW';
    }
    return 'NORMAL';
}
