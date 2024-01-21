import React, { useEffect, useState } from 'react';
import { View, Button, Alert, Modal, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import ProfileHeader from '../../../components/ProfileComponents/ProfileHeader/ProfileHeader';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import { sendInvitation } from 'helpers/firebaseInvitaitons/FirebaseInvitations';
import { CaregiverProps } from 'types/CaregiverProps';
import { PatientData } from 'types/PatientData';
import { Sidebar } from 'components/Sidebar';
import { handleLogout } from 'helpers/firebaseAuth/AuthService';
import i18n from 'common/i18n/i18n';
import { AppointmentReminder } from 'types/AppointmentReminderProps';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import firebaseConfig from 'config/firebaseConfig';
import styles from './styles';
import { Reminder } from 'types/MedicationReminderProps';
import { BloodPressureData } from 'types/BloodPressureData';

const CaregiverProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userData, setUserData] = useState<CaregiverProps>({});
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [invitationSent, setInvitationSent] = useState(false);
  const [patients, setPatients] = useState<string[]>([]);
  const [selectedPatientProfile, setSelectedPatientProfile] = useState<PatientData | null>(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [reminders, setReminders] = useState<AppointmentReminder[]>([]);
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureData[]>([]);

  const fetchBloodPressureData = async (patientId: string) => {
    const bpRef = ref(db, `bloodPressure/${patientId}`);
    try {
      const snapshot = await get(bpRef);
      if (snapshot.exists()) {
        setBloodPressureData(Object.entries(snapshot.val() as Record<string, BloodPressureData>).map(([key, value]) => ({ ...value, id: key })));
      } else {
        console.log("No blood pressure data available");
        setBloodPressureData([]);
      }
    } catch (error) {
      console.error("Error fetching blood pressure data:", error);
    }
  };

  useEffect(() => {
    if (selectedPatientId) {
      fetchBloodPressureData(selectedPatientId);
    }
  }, [selectedPatientId]);



  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase(app);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      });
      registerForPushNotificationsAsync();

      const accessControlRef = ref(db, `accessControl/${user.uid}`);
      onValue(accessControlRef, (snapshot) => {
        if (snapshot.exists()) {
          setPatients(Object.keys(snapshot.val()));
        }
      });
    }
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need notification permissions to make this work!');
    }
  };

  const scheduleReminderNotification = async (reminder: AppointmentReminder) => {
    const reminderTime = new Date(reminder.date);
    const notificationTime = new Date(reminderTime);
    notificationTime.setHours(notificationTime.getHours() - 1);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Randevu Hatırlatma",
        body: `Randevunuz: ${reminder.hospitalName} hastanesinde, Dr. ${reminder.doctorName} ile ${reminderTime.toLocaleString()}`,
        data: { reminderId: reminder.id },
        sound: 'default',
      },
      trigger: notificationTime,
    });
  };
  const scheduleMedicationReminderNotification = async (reminder: Reminder) => {
    const reminderTime = new Date(reminder.date);
    const notificationTime = new Date(reminderTime);
    notificationTime.setMinutes(notificationTime.getMinutes());
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "İlaç Alma Hatırlatma",
        body: `İlacınız: ${reminder.name}, Dozaj: ${reminder.dosage}`,
        data: { reminderId: reminder.notificationId },
        sound: 'default',
      },
      trigger: notificationTime,
    });
  };

  useEffect(() => {
    if (selectedPatientProfile) {
      const medicationReminders = selectedPatientProfile.medicationReminders;
      if (medicationReminders && Object.keys(medicationReminders).length > 0) {
        Object.values(medicationReminders).forEach(reminder => {
          scheduleMedicationReminderNotification(reminder);
        });
      }
    }
  }, [selectedPatientProfile?.medicationReminders]);

  useEffect(() => {
    if (selectedPatientId) {
      const remindersRef = ref(db, `users/${selectedPatientId}/appointmentReminders`);
      const unsubscribe = onValue(remindersRef, (snapshot) => {
        const fetchedReminders = snapshot.val();
        const formattedReminders = fetchedReminders ? Object.keys(fetchedReminders).map(key => ({
          ...fetchedReminders[key],
          id: key
        })) : [];
        setReminders(formattedReminders);
        formattedReminders.forEach(reminder => {
          scheduleReminderNotification(reminder);
        });
      });

      return () => unsubscribe();
    }

  }, [selectedPatientId]);

  const fetchPatientData = async (toUserId: string) => {
    const db = getDatabase();
    const patientRef = ref(db, `users/${toUserId}`);

    try {
      const patientSnapshot = await get(patientRef);
      if (patientSnapshot.exists()) {
        const patientData = patientSnapshot.val();

        const patientProfileWithReminders = {
          ...patientData,
          appointmentReminders: patientData.appointmentReminders || {},
          medicationReminders: patientData.reminders || {}
        };

        setSelectedPatientProfile(patientProfileWithReminders);
        setIsProfileModalVisible(true);
      } else {
        Alert.alert("Error", "Patient data not found.");
        setIsProfileModalVisible(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "An error occurred while fetching patient data.");
      setIsProfileModalVisible(false);
    }
  };

  const onPatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
    fetchPatientData(patientId);
  };

  const handleMenuPress = () => {
    toggleSidebar();
  };

  const handleEditPress = () => {
    navigation.navigate('Profile Edit Screen', { role: 'caregiver' })
  };

  const handleSendInvitation = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (patientId && currentUser) {
      sendInvitation(currentUser.uid, patientId)
        .then(() => {
          setInvitationSent(true);
          setModalVisible(false);
          Alert.alert("Invitation Sent", "Invitation has been successfully sent.");
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to send the invitation.");
          console.error('Error sending invitation:', error);
        });
    } else {
      Alert.alert("Error", "Please enter a patient ID.");
    }
  };

  const Backdrop = () => (
    <TouchableOpacity style={styles.backdrop} onPress={() => setSidebarVisible(false)} />
  );

  console.log(bloodPressureData);


  return (
    <ScrollView style={styles.screenContainer}>
      {isSidebarVisible && <Backdrop />}
      <ProfileHeader
        name={userData.name || "Name"}
        surname={userData.surname || "Surname"}
        city={userData.city || "City"}
        onEditPress={handleEditPress}
        onNotificationsPress={() => navigation.navigate('Notifications Screen')}
        onMenuPress={handleMenuPress}
      />
      <Button title="Send Invitation" onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setPatientId}
              value={patientId}
              placeholder="Enter Patient ID"
              keyboardType="default"
            />
            <Button title="Send Invitation" onPress={handleSendInvitation} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      {invitationSent && <Text>{i18n.t('InvitationSuccess')}</Text>}
      {patients.length > 0 && (
        <View>
          {patients.map((patientId) => (
            <Button key={patientId} title={`Click here for access Patient Datas with Patient ID: ${patientId}`} onPress={() => onPatientSelect(patientId)} color="blue" />
          ))}
        </View>
      )}

      {selectedPatientProfile ? (
        <View style={styles.patientProfile}>
          <Text>{i18n.t('Name')}: {selectedPatientProfile.name}</Text>
          <Text>{i18n.t('Surname')}: {selectedPatientProfile.surname}</Text>
          <Text>{i18n.t('City')}: {selectedPatientProfile.city}</Text>
          <Text>{i18n.t('Age')}: {selectedPatientProfile.age}</Text>
          <Text>{i18n.t('Weight')}: {selectedPatientProfile.weight}</Text>
          <Text>{i18n.t('Height')}: {selectedPatientProfile.height}</Text>
          <Text>{i18n.t('BloodType')}: {selectedPatientProfile.bloodType}</Text>


          {selectedPatientProfile.appointmentReminders && (
            <View>
              <Text style={styles.sectionTitle}>{i18n.t('AppointmentReminders')}:</Text>
              {Object.entries(selectedPatientProfile.appointmentReminders).map(([key, reminder]) => (
                <View key={key} style={styles.reminderItem}>
                  <Text>{i18n.t('HospitalName')}: {reminder.hospitalName}</Text>
                  <Text>{i18n.t('Department')}: {reminder.department}</Text>
                  <Text>{i18n.t('DoctorName')}: {reminder.doctorName}</Text>
                  <Text>{i18n.t('Date')}: {reminder.date}</Text>
                  <Text>{i18n.t('Hour')}: {reminder.hour}</Text>
                </View>
              ))}
            </View>
          )}

          {selectedPatientProfile.medicationReminders && Object.keys(selectedPatientProfile.medicationReminders).length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>{i18n.t('MedicationReminders')}:</Text>
              {Object.entries(selectedPatientProfile.medicationReminders).map(([key, reminder]) => (
                <View key={key} style={styles.reminderItem}>
                  <Text>{i18n.t('MedicationName')}: {reminder.name}</Text>
                  <Text>{i18n.t('Dosage')}: {reminder.dosage}</Text>
                  <Text>{i18n.t('Date')}: {reminder.date}</Text>
                  <Text>{i18n.t('Status')}: {reminder.status}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>{i18n.t('NoMedicationReminders')}</Text>
          )}

          {bloodPressureData && bloodPressureData.length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>{i18n.t('BloodPressureData')}:</Text>
              {bloodPressureData.map((bp, index) => (
                <View key={index} style={styles.reminderItem}>
                  <Text>{i18n.t('Systolic')}: {bp.systolic}</Text>
                  <Text>{i18n.t('Diastolic')}: {bp.diastolic}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>{i18n.t('NoBloodPressureData')}</Text>
          )}

        </View>
      ) : (
        <Text style={styles.selectPatient}>{i18n.t('SelectPatient')}</Text>
      )}

      {isSidebarVisible && (
        <Sidebar style={styles.caregiverSidebar} setSidebarVisible={setSidebarVisible} navigation={navigation} handleLogout={handleLogout} role='caregiver' />
      )}
    </ScrollView>
  );
};

export default CaregiverProfileScreen;