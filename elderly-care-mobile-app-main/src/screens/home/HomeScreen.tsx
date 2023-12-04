import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      if (user.role === 'caregiver') {
        navigation.navigate('CaregiverProfile');
      } else if (user.role === 'patient') {
        navigation.navigate('PatientProfile');
      }
    }
  }, [user, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Anasayfa</Text>
    </View>
  );
};

export default HomeScreen;
