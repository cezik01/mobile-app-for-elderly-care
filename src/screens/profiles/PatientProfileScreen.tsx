
import React from 'react';
import { Text,View, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader';
import PersonalInfo from '../../components/PersonalInfo';
import HealthMetrics from '../../components/HealthMetrics';
import MenuComponent from '../../components/MenuComponent';

const PatientProfileScreen = () => {
  const handleEditPress = () => {
    // Logic to handle edit button press, like navigating to an edit screen
  };
  const handleNotificationsPress = () => {
    console.log('Notifications button pressed');
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed');
  };
  console.log(HealthMetrics, MenuComponent);
  return (
    <View style={styles.screenContainer}>
      {/* Include ProfileHeader and pass the props */}
      <ProfileHeader
        name="Ali"
        city="İstanbul"
        onEditPress={handleEditPress}
        onNotificationsPress={handleNotificationsPress}
        onMenuPress={handleMenuPress}
      />

      {/* Include PersonalInfo and pass the props */}
      <PersonalInfo age={65} weight={70} height={175} bloodType="A+" />
      <HealthMetrics bloodPressure="Normal" bloodSugar="Normal" />
      <MenuComponent
        onMedicationPress={() => console.log('Medication Pressed')}
        onAppointmentsPress={() => console.log('Appointments Pressed')}
      />
      
      {/* Add other components for the patient profile screen here */}
      
    </View>
  );
};

// Define the styles for PatientProfileScreen
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // Add other styling as needed for your screen layout
  },
  // Add other styles as needed for the screen's components
});

export default PatientProfileScreen;
