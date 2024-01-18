import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import ProfileHeader from 'components/ProfileComponents/ProfileHeader/ProfileHeader';
import PersonalInfo from 'components/ProfileComponents/PersonalInfo/PersonalInfo';
import MenuComponent from 'components/ProfileComponents/Menu/MenuComponent';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import i18n from 'common/i18n/i18n';
import { determineAverageBloodPressureStatus } from 'helpers/bloodPressure';
import { PatientData } from 'types/PatientData';
import { determineAverageBloodSugarStatus } from 'helpers/bloodSugar';
import { handleLogout } from 'helpers/firebaseAuth/AuthService';
import { Sidebar } from 'components/Sidebar';
import styles from './styles';

const PatientProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userData, setUserData] = useState<PatientData>({});
  const [bloodPressureStatus, setBloodPressureStatus] = useState('Normal');
  const [bloodSugarStatus, setBloodSugarStatus] = useState('Normal');
  const [isSidebarVisible, setSidebarVisible] = useState(false);
 
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

      const bsRef = ref(db, `bloodSugar/${user.uid}`);
      onValue(bsRef, (snapshot) => {
        if (snapshot.exists()) {
          const bsData = snapshot.val();
          const latestEntryKey = Object.keys(bsData).sort().pop();
          if (latestEntryKey !== undefined) {
            const latestEntry = bsData[latestEntryKey];
            const status = determineAverageBloodSugarStatus(latestEntry.level);
            setBloodSugarStatus(status);
          }
        }
      });
    }
  }, []);

  const handleEditPress = () => {
    navigation.navigate('Profile Edit Screen');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications Screen');
  };

  const handleMenuPress = () => {
    setSidebarVisible(!isSidebarVisible);
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

  const handleMenuIconPress = () => {
    navigation.navigate('Menu Screen')
  }

  const Backdrop = () => (
    <TouchableOpacity style={styles.backdrop} onPress={() => setSidebarVisible(false)} />
  );

  return (
    <View style={styles.screenContainer}>
      {isSidebarVisible && <Backdrop />}
      <ScrollView scrollEnabled showsVerticalScrollIndicator style={styles.scrollView}>
        <View style={[styles.screenContainer, isSidebarVisible ? styles.dimmedBackground : null]}>
          <ProfileHeader
            name={userData.name || ""}
            surname={userData.surname || ""}
            city={userData.city || ""}
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
              <Image source={require('../../../../assets/profiles/Graph.png')} style={styles.bloodPressureSugarImage} />
              <Text style={[styles.bloodPressureSugarTexts]}>{i18n.t('BloodPressureEntrance')}</Text>
              <Text style={[styles.bloodStatus]}>
                {i18n.t('BloodPressureStatus')}: {bloodPressureStatus}
              </Text>
            </Pressable>
            <Pressable onPress={handleBloodSugarPress} style={styles.bloodSugar}>
              <Image source={require('../../../../assets/profiles/Group.png')} style={styles.bloodPressureSugarImage} />
              <Text style={[styles.bloodPressureSugarTexts]}>{i18n.t('BloodSugarEntrance')}</Text>
              <Text style={[styles.bloodStatus]}>{i18n.t('BloodSugarStatus')}: {bloodSugarStatus}</Text>
            </Pressable>
          </View>

          {isSidebarVisible && <Sidebar setSidebarVisible={setSidebarVisible} navigation={navigation} handleLogout={handleLogout} role='patient' />}
        </View>
      </ScrollView>
      <MenuComponent
        onMedicationPress={handleMedicationPress}
        onMenuPress={handleMenuIconPress}
        onAppointmentsPress={handleAppointmentPress}
      />
    </View>
  );
};

export default PatientProfileScreen;
