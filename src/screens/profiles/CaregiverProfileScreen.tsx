import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Modal, Text, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import ProfileHeader from '../../components/ProfileComponents/ProfileHeader';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import { sendInvitation } from 'helpers/firebaseInvitaitons/FirebaseInvitations';
import { CaregiverData } from 'types/CaregiverData';
import { PatientData } from 'types/PatientData';
import { Sidebar } from 'components/Sidebar';
import { handleLogout } from 'helpers/firebaseAuth/AuthService';
import i18n from 'common/i18n/i18n';
import { AppointmentReminder } from 'types/AppointmentReminderProps';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import firebaseConfig from 'config/firebaseConfig';

const CaregiverProfileScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [userData, setUserData] = useState<CaregiverData>({});
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [invitationSent, setInvitationSent] = useState(false);
  const [patients, setPatients] = useState<string[]>([]);
  const [selectedPatientProfile, setSelectedPatientProfile] = useState<PatientData | null>(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [reminders, setReminders] = useState<AppointmentReminder[]>([]);

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
          console.log("Access control data:", snapshot.val());
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

  const scheduleReminderNotification = async (reminder:AppointmentReminder) => {
    const reminderTime = new Date(reminder.date);
    const notificationTime = new Date(reminderTime);
    notificationTime.setHours(notificationTime.getHours() - 1); // Örneğin, randevudan 1 saat önce

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
        // Schedule notifications for each reminder
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
        console.log(patientData)
        
        const patientProfileWithReminders = {
          ...patientData,
          appointmentReminders: patientData.appointmentReminders || {},
          medicationReminders: patientData.medicationReminders || {}
          

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
  
  const filterUpcomingAppointments = (appointments: { [key: string]: AppointmentReminder }) => {
    const today = new Date();
    return Object.entries(appointments)
      .filter(([key, reminder]) => new Date(reminder.date) >= today)
      .reduce((acc, [key, reminder]) => ({ ...acc, [key]: reminder }), {});
  };
  
  
  const onPatientSelect = (patientId: string) => {
    console.log(`Patient selected: ${patientId}`); 
    setSelectedPatientId(patientId);
    fetchPatientData(patientId);
  };

  const handleEditPress = () => {
    navigation.navigate('Profile Edit Screen');
  };
  const handleNotificationsPress = () => {
    console.log('Notifications button pressed');
  };

  const handleMenuPress = () => {
    toggleSidebar();
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


  return (
    <ScrollView style={styles.screenContainer}>
      {isSidebarVisible && <Backdrop />}
      <ProfileHeader
        name={userData.name || "Name"}
        surname={userData.surname || "Surname"}
        city={userData.city || "City"}
        onEditPress={() => navigation.navigate('Profile Edit Screen')}
        onNotificationsPress={() => navigation.navigate('NotificationsScreen')}
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
        <Text style={styles.sectionTitle}>{i18n.t('Appointment Reminders')}:</Text>
        {Object.entries(selectedPatientProfile.appointmentReminders).map(([key, reminder]) => (
          <View key={key} style={styles.reminderItem}>
            <Text>{i18n.t('Hospital Name')}: {reminder.hospitalName}</Text>
            <Text>{i18n.t('Department')}: {reminder.department}</Text>
            <Text>{i18n.t('Doctor Name')}: {reminder.doctorName}</Text>
            <Text>{i18n.t('Date')}: {reminder.date}</Text>
            <Text>{i18n.t('Hour')}: {reminder.hour}</Text>
          </View>
        ))}
      </View>
    )}
    
         {selectedPatientProfile.medicationReminders && (
          <View>
        
        <Text style={styles.sectionTitle}>{i18n.t('Medication Reminders')}:</Text>
        {Object.entries(selectedPatientProfile.medicationReminders).map(([key, reminder]) => (
          
          <View key={key} style={styles.reminderItem}>
            <Text>{i18n.t('Medication Name')}: {reminder.name}</Text>
            <Text>{i18n.t('Dosage')}: {reminder.dosage}</Text>
            <Text>{i18n.t('Date')}: {reminder.date}</Text>
            <Text>{i18n.t('Status')}: {reminder.status}</Text>
          </View>
        ))}
      </View>
    )}
     </View>
      ) : (
        <Text style={styles.selectPatient}>{i18n.t('SelectPatient')}</Text>
      )}
      {patients.length > 0 && (
        <View>
          {patients.map((patientId) => (
            <Button key={patientId} title={`Click here for access Patient Datas with Patient ID: ${patientId}`} onPress={() => onPatientSelect(patientId)} color="blue" />
            ))}
        </View>
      )}

      
      {isSidebarVisible && (
        <Sidebar style={styles.caregiverSidebar} setSidebarVisible={setSidebarVisible} navigation={navigation} handleLogout={handleLogout} role='caregiver' />
      )}
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>Hastane: {item.hospitalName}</Text>
            <Text style={styles.reminderText}>Doktor: {item.doctorName}</Text>
            <Text style={styles.reminderText}>Tarih ve Saat: {item.date}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  caregiverSidebar: {
    height: '300%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  patientProfile: {
    padding: 20,
    marginTop: 10,
    backgroundColor: "#f0f0f0"
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  centeredModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  selectPatient: {
    marginVertical: 20,
    color: "blue",
    fontSize: 16,
  },sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  reminderItem: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  }, 
  reminderText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CaregiverProfileScreen;