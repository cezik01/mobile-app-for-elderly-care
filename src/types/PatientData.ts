import { AppointmentReminder } from "./AppointmentReminderProps";
import {Reminder} from './MedicationReminderProps';

export interface PatientData {
    name?: string;
    surname?: string;
    city?: string;
    age?: number;
    weight?: number;
    height?: number;
    bloodType?: string;
    appointmentReminders?: { [key: string]: AppointmentReminder };
    medicationReminders?: {[key: string]: Reminder};
    
}