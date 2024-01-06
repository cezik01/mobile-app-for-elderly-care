export interface AppointmentReminder {
    id: string;
    hospitalName: string;
    department: string;
    doctorName: string;
    date: string;
    hour: string;
    notificationId?: string;
}