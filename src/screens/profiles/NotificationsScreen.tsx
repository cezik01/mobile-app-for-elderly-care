import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

interface Invitation {
  id: string;
  from: string;
  to: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: number;
}

const NotificationsScreen = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const auth = getAuth();
  const db = getDatabase();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const invitationsRef = ref(db, 'invitations');
      onValue(invitationsRef, (snapshot) => {
        if (snapshot.exists()) {
          const invitationsData: Invitation[] = [];
          snapshot.forEach((childSnapshot) => {
            const invitation = childSnapshot.val() as Invitation;
            if (invitation.to === user.uid) {
              invitation.id = childSnapshot.key;
              invitationsData.push(invitation);
            }
          });
          setInvitations(invitationsData);
        }
      });
    }
  }, [user]);

  const handleAcceptInvitation = async (invitationId: string, fromUserId: string, toUserId: string) => {
    const db = getDatabase();
    await update(ref(db, `invitations/${invitationId}`), { status: 'accepted' });
    console.log(`Accepting invitation: ${invitationId}, from: ${fromUserId}, to: ${toUserId}`);
    
    const accessControlRef = ref(db, `accessControl/${fromUserId}/${toUserId}`);
    await update(accessControlRef, { hasAccess: true });
  };
  
  

  const handleRejectInvitation = async (invitationId: string) => {
    await update(ref(db, `invitations/${invitationId}`), { status: 'rejected' });
  };

  return (
    <View>
      {invitations.map((invitation) => (
        <View key={invitation.id}>
          <Text>{`Invitation from ${invitation.from}`}</Text>
          <Button title="Accept" onPress={() => handleAcceptInvitation(invitation.id, invitation.from, invitation.to)} />
          <Button title="Reject" onPress={() => handleRejectInvitation(invitation.id)} />
        </View>
      ))}
    </View>
  );
};

export default NotificationsScreen;