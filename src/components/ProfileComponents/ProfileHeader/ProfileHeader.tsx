import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import i18n from 'common/i18n/i18n';
import FontSizeContext from '../../../context/FontSizeContext';
import { ProfileHeaderProps } from 'types/ProfileHeaderProps';
import { styles } from './styles';

type FontSizeKey = 'small' | 'medium' | 'large';
const fontSizeMap: { [key in FontSizeKey]: number } = {
  small: 14,
  medium: 16,
  large: 18,
};

const ProfileHeader = ({ name, surname, city, onEditPress, onNotificationsPress, onMenuPress }: ProfileHeaderProps) => {
  const { fontSize } = useContext(FontSizeContext);
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
  const fontSizeMap = {
    small: 14,
    medium: 16,
    large: 18,
  };
  const fontSizeValue = fontSizeMap[fontSize as FontSizeKey];

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={onMenuPress}>
        <Image source={require('../../../../assets/profiles/Menu.png')} style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={profileImage !== null ? { uri: profileImage } : require('../../../../assets/profiles/Profile.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={[styles.name, { fontSize: fontSizeValue }]}>{name} {surname}</Text>
      <Text style={[styles.city, { fontSize: fontSizeValue - 4 }]}>{city}</Text>

      <TouchableOpacity style={styles.editProfileButton} onPress={onEditPress}>
        <Text style={styles.editProfileText}>
          {i18n.t('EditProfile')}
        </Text>
        <Image
          source={require('../../../../assets/profiles/Edit.png')}
          style={styles.editIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationIconContainer} onPress={onNotificationsPress}>
        <Image source={require('../../../../assets/profiles/Notifications.png')} style={styles.notificationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
