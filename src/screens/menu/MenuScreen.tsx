import { MaterialIcons } from '@expo/vector-icons';
import i18n from 'common/i18n/i18n';
import MenuComponent from 'components/ProfileComponents/Menu/MenuComponent';
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MenuItemProps } from 'types/MenuItemProps';
import { MenuScreenProps } from 'types/MenuScreenProps';
import { styles } from './styles';

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

  const handleHelpPress = () => {
    navigation.navigate('Help Screen')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
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
            icon={require('../../../assets/menu/contacts.png')}
            text='Contacts'
            onPress={handleContactsPress}
          />
        </View>
        <TouchableOpacity onPress={handleHelpPress}
        >
          <View style={styles.questionMarkContainer}>
            <MaterialIcons name='help' style={styles.questionMarkIcon} size={25} />
            <Text style={styles.helpText}>
              {i18n.t('Help')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <MenuComponent
        onMedicationPress={() => navigation.navigate('Medication Screen')}
        onMenuPress={() => navigation.navigate('Menu Screen')}
        onAppointmentsPress={() => navigation.navigate('Appointment Screen')}
      />
    </SafeAreaView>
  );
};

export default MenuScreen;
