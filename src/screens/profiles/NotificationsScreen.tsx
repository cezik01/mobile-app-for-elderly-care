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
      const invitationsRef = ref(db, `invitations/${user.uid}`);
      onValue(invitationsRef, (snapshot) => {
        if (snapshot.exists()) {
          // Initialize the array with the correct type
          const invitationsData: Invitation[] = [];
          snapshot.forEach((childSnapshot) => {
            const invitation = childSnapshot.val() as Invitation; // Typecast the data to Invitation
            invitation.id = childSnapshot.key; // Set the id
            invitationsData.push(invitation);
          });
          setInvitations(invitationsData);
        }
      });
    }
  }, [user]);

  const handleAcceptInvitation = (invitationId: string) => {
    // Implement function to accept invitation
  };

  const handleRejectInvitation = (invitationId: string) => {
    // Implement function to reject invitation
  };

  return (
    <View>
      {invitations.map((invitation) => (
        <View key={invitation.id}>
          <Text>{`Invitation from ${invitation.from}`}</Text>
          <Button title="Accept" onPress={() => handleAcceptInvitation(invitation.id)} />
          <Button title="Reject" onPress={() => handleRejectInvitation(invitation.id)} />
        </View>
      ))}
    </View>
  );
};

export default NotificationsScreen;
