import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type MenuItemProps = {
  onPress: () => void;
  iconName: any; // Changed type to 'any' to accommodate the require statement
  text: string;
};

// Corrected MenuItem component
const MenuItem = ({ onPress, iconName, text }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Image source={iconName} style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
  </TouchableOpacity>
);

type MenuProps = {
  onMedicationPress: () => void;
  onAppointmentsPress: () => void;
};

const MenuComponent = ({ onMedicationPress, onAppointmentsPress }: MenuProps) => {
  return (
    <View style={styles.menuContainer}>
      <MenuItem
        onPress={onMedicationPress}
        iconName={require('../../assets/medicationIcon.png')}
        text="Medication"
      />
      <MenuItem
        onPress={onAppointmentsPress}
        iconName={require('../../assets/appointmentsIcon.png')}
        text="Appointments"
      />
      {/* Add more menu items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute', // Position absolutely within the parent container
    bottom: 0, // Align to the bottom of the parent container
    left: 0, // Align to the left of the parent container
    right: 0, // Align to the right of the parent container
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-around', // Evenly space the items
    alignItems: 'center', // Align items vertically
    padding: 10,
    backgroundColor: '#fff', // Assuming you want a white background
    borderTopWidth: 1, // Add a top border if needed for design
    borderTopColor: '#ddd', // Border color, change as needed
  },
  menuItem: {
    alignItems: 'center', // Center the items vertically
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  menuText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5, // Adjust the space between the icon and text as needed
  },
  // Add other styles as needed
});

export default MenuComponent;
