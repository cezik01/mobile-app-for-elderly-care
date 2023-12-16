import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';

type HealthMetric = 'Normal' | 'High' | 'Low';

interface UserData {
  name?: string;
  city?: string;
}

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

  const handleEditPress = () => {
    navigation.navigate('Profile Edit Screen');
  };
  const handleNotificationsPress = () => {
    console.log('Notifications button pressed');
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed');
  };

  return (
    <View style={styles.screenContainer}>
      <ProfileHeader
        name={userData.name || "Name not set"}
        city={userData.city || "City not set"}
        onEditPress={handleEditPress}
        onNotificationsPress={handleNotificationsPress}
        onMenuPress={handleMenuPress}
      />
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
