import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type ProfileHeaderProps = {
  name: string;
  city: string;
  onEditPress: () => void;
  onNotificationsPress: () => void; 
  onMenuPress: () => void;
};

const ProfileHeader = ({ name, city, onEditPress, onNotificationsPress, onMenuPress}: ProfileHeaderProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Fotoğraf seçmek için izin gerekiyor!');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
       setProfileImage((pickerResult as any).uri);
};
  }; 
  
  return (
    <View style={styles.headerContainer}>
      {/* Menu Icon */}
      <TouchableOpacity style={styles.menuIconContainer} onPress={onMenuPress}>
        <Image source={require('../../assets/Menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
  <Image
    source={profileImage !== null ? { uri: profileImage } : require('../../assets/Profile.png')}
    style={styles.profileImage}
  />
</TouchableOpacity>
<Text style={styles.name}>{name}</Text>
      <Text style={styles.city}>{city}</Text>
      <TouchableOpacity style={styles.editProfileButton} onPress={onEditPress}>
        <Image
          source={require('../../assets/Edit.png')} 
          style={styles.editIcon}
        />
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationIconContainer} onPress={onNotificationsPress}>
        <Image source={require('../../assets/Notifications.png')} style={styles.notificationIcon} />
      </TouchableOpacity>
    </View>
  );
  
};



const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 30, 
    paddingBottom: 20, 
  },
  profileImage: {
    width: 120, // Width of the profile image
    height: 120, // Height of the profile image
    borderRadius: 60, // Makes it circular
    borderWidth: 2, // Border thickness
    borderColor: 'purple', // Border color
    marginBottom: 10, // Space between the image and the text below
  },
  name: {
    fontSize: 20, // Size of the font
    fontWeight: 'bold', // Thickness of the font
    color: 'black', // Color of the text
    marginBottom: 4, // Space between the name and the city text
  },
  city: {
    fontSize: 16, // Size of the font
    color: 'grey', // Color of the text
  },
  editProfileButton: {
    position: 'absolute',
    top: 40, // Increase the top value to move the button down
    right: 10, // Adjust the right value as needed
    flexDirection: 'row',
    alignItems: 'center', 
  },
  editProfileText: {
    fontSize: 16, // Size of the font
    color: 'blue', // Color of the 'Edit Profile' text
    textDecorationLine: 'underline', // Underlines the text
  },
  editIcon: {
    width: 20, // Set the width of your icon
    height: 20, // Set the height of your icon
    marginRight: 5, // Add some margin between the icon and the text
    // ... other styles you need for the icon
  },
  menuIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, // Makes sure the touchable is above other components
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  notificationIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Makes sure the touchable is above other components
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
});


export default ProfileHeader;
