import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProfileHeader from '../../components/ProfileHeader'; 
import MenuComponent from '../../components/MenuComponent'; 

const CaregiverProfileScreen = () => {
  
  const handleEditPress = () => {
    // Logic for handling edit
  };

  const handleNotificationsPress = () => {
    // Logic for handling notifications 
  };

  const handleMenuPress = () => {
    // Logic for handling menu
  };

  // Define any handlers for the MenuComponent
  const handleMedicationPress = () => {
    // Logic for medication 
  };

  const handleAppointmentsPress = () => {
    // Logic for appointments
  };

  return (
    <View style={styles.screenContainer}>
      <ProfileHeader
        name="Caregiver Name"
        city="City Name"
        handleEditPress={handleEditPress}
        onNotificationsPress={handleNotificationsPress}
        onMenuPress={handleMenuPress}
      />
      {}
      <MenuComponent
        onMedicationPress={handleMedicationPress}
        onAppointmentsPress={handleAppointmentsPress}
      />
      {}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  
});

export default CaregiverProfileScreen;
