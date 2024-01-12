import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native';
import ProfileHeader from 'components/ProfileComponents/ProfileHeader';
import PersonalInfo from 'components/ProfileComponents/PersonalInfo';
import MenuComponent from 'components/ProfileComponents/MenuComponent';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import i18n from 'common/i18n/i18n';
import { determineAverageBloodPressureStatus } from 'helpers/bloodPressure';
import { PatientData } from 'types/PatientData';
import { determineAverageBloodSugarStatus } from 'helpers/bloodSugar';
import FontSizeContext from '../../context/FontSizeContext';
import { handleLogout } from 'helpers/firebaseAuth/AuthService';
import { Sidebar } from 'components/Sidebar';
import { heightPercentageToDP } from 'helpers/dimension';

const PatientProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userData, setUserData] = useState<PatientData>({});
  const [bloodPressureStatus, setBloodPressureStatus] = useState('Normal');
  const [bloodSugarStatus, setBloodSugarStatus] = useState('Normal');
  const { fontSize } = useContext(FontSizeContext);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  console.log("Current font size in patient profile:", fontSize);

  type FontSizeKey = 'small' | 'medium' | 'large';

  const fontSizeMap: { [key in FontSizeKey]: number } = {
    small: 14,
    medium: 16,
    large: 18,
  };

  const fontSizeValue = fontSizeMap[fontSize as FontSizeKey];

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
    navigation.navigate('NotificationsScreen');
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
    console.log('Menu button pressed');
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
            fontSizeValue={fontSizeValue}
          />
          <View style={styles.bloodSugarPressure}>
            <Pressable onPress={handleBloodPressurePress}>
              <Image source={require('../../../assets/profiles/Graph.png')} style={styles.bloodPressureSugarImage} />
              <Text style={[styles.bloodPressureSugarTexts, { fontSize: fontSizeValue }]}>{i18n.t('BloodPressureEntrance')}</Text>
              <Text style={[styles.bloodStatus, { fontSize: fontSizeValue }]}>
                {i18n.t('BloodPressureStatus')}: {bloodPressureStatus}
              </Text>
            </Pressable>
            <Pressable onPress={handleBloodSugarPress} style={styles.bloodSugar}>
              <Image source={require('../../../assets/profiles/Group.png')} style={styles.bloodPressureSugarImage} />
              <Text style={[styles.bloodPressureSugarTexts, { fontSize: fontSizeValue }]}>{i18n.t('BloodSugarEntrance')}</Text>
              <Text style={[styles.bloodStatus, { fontSize: fontSizeValue }]}>{i18n.t('BloodSugarStatus')}: {bloodSugarStatus}</Text>
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

const styles = StyleSheet.create({
  bloodStatus: {
    marginVertical: 10,
    color: "red",
    fontSize: 16,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  scrollView: {
    maxHeight: heightPercentageToDP('80'),
    zIndex: 1,
  },
  bloodPressureSugarImage: {
    alignSelf: 'center',
  },
  bloodSugarPressure: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bloodSugar: {
    marginTop: 50,
  },
  bloodPressureSugarTexts: {
    marginTop: 20,
    color: 'blue',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  dimmedBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

});

export default PatientProfileScreen;
