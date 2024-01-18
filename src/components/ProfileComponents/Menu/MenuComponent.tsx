import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { MenuProps } from 'types/MenuProps';
import { MenuComponentItemProps } from 'types/MenuComponentItemProps';

const MenuItem = ({ onPress, iconName, text }: MenuComponentItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={iconName} style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

const MenuComponent = ({ onMedicationPress, onAppointmentsPress, onMenuPress }: MenuProps) => {


  return (
    <View style={styles.menuContainer}>
      <MenuItem
        onPress={onMedicationPress}
        iconName={require('../../../../assets/profiles/medicationIcon.png')}
        text="Medication"
        
      />
      <MenuItem
        onPress={onMenuPress}
        iconName={require('../../../../assets/profiles/menuIcon1.png')}
        text="Menu"
        
      />
      <MenuItem
        onPress={onAppointmentsPress}
        iconName={require('../../../../assets/profiles/appointmentsIcon.png')}
        text="Appointments"
        
      />
    </View>
  );
};

export default MenuComponent;
