import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontSizeContext from '../../context/FontSizeContext';

type MenuItemProps = {
  onPress: () => void;
  iconName: any;
  text: string;
  fontSizeValue: number;
};


const MenuItem = ({ onPress, iconName, text }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={iconName} style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>

);

type MenuProps = {
  onMedicationPress: () => void;
  onAppointmentsPress: () => void;
  onMenuPress: () => void;
};

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
        iconName={require('../../../assets/profiles/medicationIcon.png')}
        text="Medication"
        fontSizeValue={fontSizeValue}
      />
      <MenuItem
        onPress={onMenuPress}
        iconName={require('../../../assets/profiles/menuIcon1.png')}
        text="Menu"
        fontSizeValue={fontSizeValue}
      />
      <MenuItem
        onPress={onAppointmentsPress}
        iconName={require('../../../assets/profiles/appointmentsIcon.png')}
        text="Appointments"
        fontSizeValue={fontSizeValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },


});

export default MenuComponent;
