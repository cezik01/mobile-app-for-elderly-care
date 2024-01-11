export interface Reminder {
    id: string;
    name: string;
    date: string;
    dosage: string;
    notificationId?: string;
    status?: 'accepted' | 'dismissed' | 'none';
  }
  