import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert, Modal, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import ProfileHeader from '../../components/ProfileComponents/ProfileHeader';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, get} from 'firebase/database';
import { NavigationProp } from '@react-navigation/native';
import { sendInvitation } from 'helpers/firebaseInvitaitons/FirebaseInvitations';
import { CaregiverData } from 'types/CaregiverData';
import { PatientData } from 'types/PatientData';
import { Sidebar } from 'components/Sidebar';
import { handleLogout } from 'helpers/firebaseAuth/AuthService';
import i18n from 'common/i18n/i18n';

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

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log("User data:", snapshot.val());
          setUserData(snapshot.val());
        }
      });
      
      const accessControlRef = ref(db, `accessControl/${user.uid}`);
      onValue(accessControlRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log("Access control data:", snapshot.val());
          setPatients(Object.keys(snapshot.val()));
        }
      });
    }
  }, []);

  /*useEffect(() => {
    const db = getDatabase();
    if (selectedPatientId) {
      const patientProfileRef = ref(db, `users/${selectedPatientId}`);
      onValue(patientProfileRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log("Selected patient profile:", snapshot.val());
          setSelectedPatientProfile(snapshot.val());
        } else {
          setSelectedPatientProfile(null);
        }
      });
    }
  }, [selectedPatientId]);*/

  const fetchPatientData = async (toUserId: string) => {
    // Veritabanı referansını al
    const db = getDatabase();
    // Kullanıcının ID'si ile veritabanında doğru yola eriş
    const patientRef = ref(db, `users/${toUserId}`);
  
    try {
      // Veri çekme işlemini gerçekleştir
      const snapshot = await get(patientRef);
      if (snapshot.exists()) {
        // Eğer veri varsa, snapshot'tan verileri al
        const patientData = snapshot.val();
        // State'i güncelle
        setSelectedPatientProfile(patientData);
        setIsProfileModalVisible(true);
      } else {
        // Eğer kullanıcıya ait veri yoksa, hata mesajı göster
        Alert.alert("Error", "Patient data not found.");
        setIsProfileModalVisible(false);
      }
    } catch (error) {
      // Hata oluşursa, hata mesajını logla ve kullanıcıya bildir
      console.error("Error fetching data:", error);
      Alert.alert("Error", "An error occurred while fetching patient data.");
      setIsProfileModalVisible(false);
    }
  };
  
  
  
  
  
  const onPatientSelect = (patientId: string) => {
    console.log(`Patient selected: ${patientId}`); // Debug için
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
      {invitationSent && <Text>Invitation sent successfully!</Text>}

      {selectedPatientProfile ? (
        <View style={styles.patientProfile}>
          <Text>Name: {selectedPatientProfile.name}</Text>
    <Text>Surname: {selectedPatientProfile.surname}</Text>
    <Text>City: {selectedPatientProfile.city}</Text>
    <Text>Age: {selectedPatientProfile.age}</Text>
    <Text>Weight: {selectedPatientProfile.weight}</Text>
    <Text>Height: {selectedPatientProfile.height}</Text>
    <Text>Blood Type: {selectedPatientProfile.bloodType}</Text>
        </View>
      ) : (
        <Text>Select a patient to view details.</Text>
      )}
      {patients.length > 0 && (
    <View>
      {patients.map((patientId) => (
        // Her patient için bir buton oluşturun
        <Button key={patientId} title={`Patient ID: ${patientId}`} onPress={() => onPatientSelect(patientId)} />
      ))}
    </View>
  )}
  
  <Modal
  animationType="slide"
  transparent={true}
  visible={isProfileModalVisible}
  onRequestClose={() => setIsProfileModalVisible(false)}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text>Hello World</Text>
      <Button title="Close Modal" onPress={() => setIsProfileModalVisible(false)} />
    </View>
  </View>
</Modal>
      {isSidebarVisible && (
        <Sidebar style={styles.caregiverSidebar} setSidebarVisible={setSidebarVisible} navigation={navigation} handleLogout={handleLogout} />
      )}
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
    marginTop: 50, // İhtiyaca göre ayarlayın
  }
  
});

export default CaregiverProfileScreen;