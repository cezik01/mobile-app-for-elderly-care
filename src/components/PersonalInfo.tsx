import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type PersonalInfoProps = {
  age: number;
  weight: number;
  height: number;
  bloodType: string;
};
type PersonalInfoItemProps = {
  icon: any;
  label: string;
};

const PersonalInfo = ({ age, weight, height, bloodType }: PersonalInfoProps) => {
  return (
    <View style={styles.container}>
      <PersonalInfoItem icon={require('../../assets/profiles/Age.png')} label={`Age: ${age.toString()}`} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../assets/profiles/Weight.png')} label={`Weight: ${weight.toString()}`} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../assets/profiles/Height.png')} label={`Height: ${height.toString()}`} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../assets/profiles/BloodType.png')} label={`Blood Type: ${bloodType}`} />
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
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10

  },
  infoItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10

  },
  divider: {
    height: 10,
    width: 1,
    backgroundColor: '#000',
    marginHorizontal: 9,

  },
});


export default PersonalInfo;
