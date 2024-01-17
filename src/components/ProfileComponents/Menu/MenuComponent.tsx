import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontSizeContext from '../../../context/FontSizeContext';
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
  const { fontSize } = useContext(FontSizeContext);
  type FontSizeKey = 'small' | 'medium' | 'large';

  const fontSizeMap: { [key in FontSizeKey]: number } = {
    small: 12,
    medium: 14,
    large: 16,
  };

  const fontSizeValue = fontSizeMap[fontSize as FontSizeKey];

  return (
    <View style={styles.menuContainer}>
      <MenuItem
        onPress={onMedicationPress}
        iconName={require('../../../../assets/profiles/medicationIcon.png')}
        text="Medication"
        fontSizeValue={fontSizeValue}
      />
      <MenuItem
        onPress={onMenuPress}
        iconName={require('../../../../assets/profiles/menuIcon1.png')}
        text="Menu"
        fontSizeValue={fontSizeValue}
      />
      <MenuItem
        onPress={onAppointmentsPress}
        iconName={require('../../../../assets/profiles/appointmentsIcon.png')}
        text="Appointments"
        fontSizeValue={fontSizeValue}
      />
    </View>
  );
};

export default MenuComponent;
