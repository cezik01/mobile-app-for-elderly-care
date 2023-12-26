import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import ProfileHeader from 'components/ProfileComponents/ProfileHeader';
import PersonalInfo from 'components/ProfileComponents/PersonalInfo';
import MenuComponent from 'components/ProfileComponents/MenuComponent';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import i18n from 'common/i18n/i18n';
import { determineAverageBloodPressureStatus } from 'helpers/bloodPressure';
import { PatientData } from 'types/PatientData';

const PatientProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userData, setUserData] = useState<PatientData>({});
  const [bloodPressureStatus, setBloodPressureStatus] = useState('Normal');

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

      const bpRef = ref(db, `bloodPressure/${user.uid}`);
      onValue(bpRef, (snapshot) => {
        if (snapshot.exists()) {
          const bpData = snapshot.val();
          const latestEntryKey = Object.keys(bpData).sort().pop();
          if (latestEntryKey !== undefined) {
            const latestEntry = bpData[latestEntryKey];
            const status = determineAverageBloodPressureStatus(latestEntry.systolic, latestEntry.diastolic);
            setBloodPressureStatus(status);
          }
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
  };

  const handleAppointmentPress = () => {
    navigation.navigate('Appointment Screen');
  };

  const handleBloodPressurePress = () => {
    navigation.navigate('Blood Pressure Screen');
  };

  const handleBloodSugarPress = () => {
    navigation.navigate('Blood Sugar Screen');
  };

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
      <View style={styles.bloodSugarPressure}>
        <Pressable onPress={handleBloodPressurePress}>
          <Image source={require('../../../assets/profiles/Graph.png')} style={styles.bloodPressureSugarImage} />
          <Text style={styles.bloodPressureSugarTexts}>{i18n.t('BloodPressureEntrance')}</Text>
          <Text style={styles.bloodPressureStatus}>{i18n.t('BloodPressureStatus')}: {bloodPressureStatus}</Text>
        </Pressable>
        <Pressable onPress={handleBloodSugarPress} style={styles.bloodSugar}>
          <Image source={require('../../../assets/profiles/Group.png')} style={styles.bloodPressureSugarImage} />
          <Text style={styles.bloodPressureSugarTexts}>{i18n.t('BloodSugarEntrance')}</Text>
        </Pressable>
      </View>
      <MenuComponent
        onMedicationPress={handleMedicationPress}
        onAppointmentsPress={handleAppointmentPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bloodPressureStatus: {
    marginVertical: 10,
    color: "red"
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bloodPressureSugarImage: {
    alignSelf: 'center',
  },
  bloodSugarPressure: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  bloodSugar: {
    marginTop: 50,
  },
  bloodPressureSugarTexts: {
    marginTop: 20,
    color: 'blue',
  }
});

export default PatientProfileScreen;
