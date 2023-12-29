

import { getDatabase, ref, push, update } from 'firebase/database';

// Yeni bir davet gönderme
export const sendInvitation = async (fromUserId: string, toUserId: string):Promise<void> => {
  const db = getDatabase();
  try {
    const newInvitationRef = ref(db, 'invitations');
    const newInvitation = {
      from: fromUserId,
      to: toUserId,
      status: 'pending',
      timestamp: Date.now(),
    };
    await push(newInvitationRef, newInvitation);
  } catch (error) {
    console.error('Error sending invitation:', error);
  }
};



