import React from 'react';
import { View, Text, Image } from 'react-native';
import { PersonalInfoItemProps } from 'types/PersonalInfoItemProps';
import { PersonalInfoProps } from 'types/PersonalInfoProps';
import { styles } from './styles';

const PersonalInfo = ({ age, weight, height, bloodType }: PersonalInfoProps) => {
  return (
    <View style={styles.container}>
      <PersonalInfoItem icon={require('../../../../assets/profiles/Age.png')} label={`Age: ${age.toString()}`} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../../../assets/profiles/Weight.png')} label={`Weight: ${weight.toString()}`} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../../../assets/profiles/Height.png')} label={`Height: ${height.toString()}`} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../../../assets/profiles/BloodType.png')} label={`Blood Type: ${bloodType}`} />
    </View>
  );
};

const PersonalInfoItem = ({ icon, label }: PersonalInfoItemProps) => {
  return (
    <View style={styles.infoItem}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.infoText}>{label}</Text>
    </View>
  );
};

export default PersonalInfo;
