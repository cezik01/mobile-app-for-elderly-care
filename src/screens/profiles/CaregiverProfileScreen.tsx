import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ProfileHeader from '../../components/ProfileComponents/ProfileHeader';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import { sendInvitation } from 'helpers/firebaseInvitaitons/FirebaseInvitations';
import { CaregiverData } from 'types/CaregiverData';

const PatientProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("No data available");
        }
      });
    }
  }, []);

  const onPatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleEditPress = () => {
    navigation.navigate('Profile Edit Screen');
  };
  const handleNotificationsPress = () => {
    console.log('Notifications button pressed');
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed');
  };

  const sendInvitationToPatient = (patientId: string) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      sendInvitation(currentUser.uid, patientId);
    } else {
      console.log("User not logged in");
      // Kullanıcı giriş yapmamışsa burada uygun bir işlem yapın
    }
  };
  

  return (
    <View style={styles.screenContainer}>
      <ProfileHeader
        name={userData.name || "Name "}
        city={userData.city || "City "}
        onEditPress={handleEditPress}
        onNotificationsPress={handleNotificationsPress}
        onMenuPress={handleMenuPress}
        
      />
      <Button title="Send Invitation" onPress={() => sendInvitationToPatient(selectedPatientId)} />

    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default PatientProfileScreen;
