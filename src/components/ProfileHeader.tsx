import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import i18n from 'common/i18n/i18n';

type ProfileHeaderProps = {
  name: string;
  city: string;
  onEditPress: () => void;
  onNotificationsPress: () => void;
  onMenuPress: () => void;
};

const ProfileHeader = ({ name, city, onEditPress, onNotificationsPress, onMenuPress }: ProfileHeaderProps) => {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Need permission to access photos');
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setProfileImage((pickerResult as any).uri);
    };
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={onMenuPress}>
        <Image source={require('../../assets/profiles/Menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage !== null ? { uri: profileImage } : require('../../assets/profiles/Profile.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.city}>{city}</Text>
      <TouchableOpacity style={styles.editProfileButton} onPress={onEditPress}>
        <Text style={styles.editProfileText}>
          {i18n.t('EditProfile')}
        </Text>
        <Image
          source={require('../../assets/profiles/Edit.png')}
          style={styles.editIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationIconContainer} onPress={onNotificationsPress}>
        <Image source={require('../../assets/profiles/Notifications.png')} style={styles.notificationIcon} />
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
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'purple',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  city: {
    fontSize: 16,
    color: 'grey',
  },
  editProfileButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginRight: 7,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  menuIconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  notificationIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
});


export default ProfileHeader;
