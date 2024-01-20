import React from 'react';
import { View } from 'react-native';
import { PersonalInfoProps } from 'types/PersonalInfoProps';
import { styles } from './styles';
import PersonalInfoItem from './PersonalInfoItem';

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

export default PersonalInfo;
