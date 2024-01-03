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

const PersonalInfo = ({ age, weight, height, bloodType, fontSizeValue }: PersonalInfoProps & { fontSizeValue: number }) => {
  console.log("Font size value in PersonalInfo:", fontSizeValue);
  return (
    <View style={styles.container}>
      <PersonalInfoItem icon={require('../../../assets/profiles/Age.png')} label={`Age: ${age.toString()}`} fontSizeValue={fontSizeValue} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../../assets/profiles/Weight.png')} label={`Weight: ${weight.toString()}`} fontSizeValue={fontSizeValue} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../../assets/profiles/Height.png')} label={`Height: ${height.toString()}`} fontSizeValue={fontSizeValue} />
      <View style={styles.divider} />
      <PersonalInfoItem icon={require('../../../assets/profiles/BloodType.png')} label={`Blood Type: ${bloodType}`} fontSizeValue={fontSizeValue} />
    </View>
  );
};

const PersonalInfoItem = ({ icon, label, fontSizeValue }: PersonalInfoItemProps & { fontSizeValue: number }) => {
  return (
    <View style={styles.infoItem}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={[styles.infoText, { fontSize: fontSizeValue }]}>{label}</Text>
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
