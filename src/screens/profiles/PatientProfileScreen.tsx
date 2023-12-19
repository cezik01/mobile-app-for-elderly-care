import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileHeader from 'components/ProfileComponents/ProfileHeader';
import PersonalInfo from 'components/ProfileComponents/PersonalInfo';
import HealthMetrics from 'components/ProfileComponents/HealthMetrics';
import MenuComponent from 'components/ProfileComponents/MenuComponent';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';


type HealthMetric = 'Normal' | 'High' | 'Low';

interface UserData {
  name?: string;
  city?: string;
  age?: number;           
  weight?: number;
  height?: number;
  bloodType?: string;
  bloodPressure?: HealthMetric;  
  bloodSugar?: HealthMetric;
  
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
    navigation.navigate('NotificationsScreen');
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed');
  };
  
  const handleMedicationPress = () => {
    navigation.navigate('Medication Screen');
  }
  const handleAppointmentPress= ()=>{
    navigation.navigate('Appointment Screen');
  }
  

  return (
    <View style={styles.screenContainer}>
      <ProfileHeader
        name={userData.name || "Name"}
        city={userData.city || "City"}
        onEditPress={handleEditPress}
        onNotificationsPress={handleNotificationsPress}
        onMenuPress={handleMenuPress}
      />
      <PersonalInfo 
        age={userData.age || 0} 
        weight={userData.weight || 0} 
        height={userData.height || 0} 
        bloodType={userData.bloodType || "N/A"} 
      />
      <HealthMetrics 
        bloodPressure={userData.bloodPressure || 'Normal'}
        bloodSugar={userData.bloodSugar || 'Normal'}
      />
      <MenuComponent
        onMedicationPress={handleMedicationPress}
        onAppointmentsPress={handleAppointmentPress}
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
