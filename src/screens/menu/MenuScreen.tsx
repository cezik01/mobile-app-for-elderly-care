import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MenuItemProps } from 'types/MenuItemProps';
import { MenuScreenProps } from 'types/MenuScreenProps';

const MenuItem = ({ onPress, icon, text }: MenuItemProps) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    <View style={styles.iconContainer}>
      <Image source={icon} style={styles.icon} />
    </View>
    <Text style={styles.itemText}>{text}</Text>
  </TouchableOpacity>
);

const MenuScreen = ({ navigation }: MenuScreenProps) => {
  const handleProfilePress = () => {
    navigation.navigate('Patient Profile');
  };

  const handleMedicationPress = () => {
    navigation.navigate('Medication Screen');
  };

  const handleAppointmentPress = () => {
    navigation.navigate('Appointment Screen');
  };
  const handleFontSettingsPress = () => {
    navigation.navigate('Font Settings Screen');
  };
  const handleContactsPress = () => {
    navigation.navigate('Contacts Screen');
  };


  const placeholderPress = () => console.warn('Pressed');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuGrid}>
        <MenuItem
          icon={require('../../../assets/menu/menuProfile.png')}
          text='My Profile'
          onPress={handleProfilePress}
        />

        <MenuItem
          icon={require('../../../assets/menu/medicationSchedule.png')}
          text='Medication Schedule'
          onPress={handleMedicationPress}
        />
        <MenuItem
          icon={require('../../../assets/menu/medicationAppointment.png')}
          text='Medical Appointment'
          onPress={handleAppointmentPress}
        />
        <MenuItem
          icon={require('../../../assets/menu/fontSettings.png')}
          text='Font Settings'
          onPress={handleFontSettingsPress}
        />
        <MenuItem
          icon={require('../../../assets/menu/contacts.png')}
          text='Contacts'
          onPress={handleContactsPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  menuItem: {
    width: '45%',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    borderRadius: 100,
    width: 120,
    height: 120,
    backgroundColor: '#f8d7e4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  itemText: {
    textAlign: 'center',
  },
});


export default MenuScreen;
