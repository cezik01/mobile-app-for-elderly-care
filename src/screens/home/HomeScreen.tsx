import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Anasayfa</Text>
    </View>
  );
};

export default HomeScreen;
