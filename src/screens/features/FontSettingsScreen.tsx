import React, { useContext } from 'react';
import { View, Button, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import FontSizeContext from '../../context/FontSizeContext';

type FontSettingsScreenProps = {
  navigation: NavigationProp<any>;
};

const FontSettingsScreen = ({ navigation }: FontSettingsScreenProps) => {
  const fontSizeContext = useContext(FontSizeContext);
  
  if (!fontSizeContext) {
    console.error('FontSizeContext not found');
    return null; // or some fallback UI
  }

  const { setFontSize } = fontSizeContext;

  const updateFontSize = (size: string) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    
    if (userId) {
      const db = getDatabase();
      const fontSizeRef = ref(db, `users/${userId}/preferences/fontSize`);

      // Update font size in Firebase
      set(fontSizeRef, size)
        .then(() => {
          // Update font size in context
          setFontSize(size);

          // Show a success message
          Alert.alert("Profile Updated", "Your font size preference has been saved.");
        })
        .catch((error) => {
          // Handle errors here, possibly showing an error message
          Alert.alert("Update Failed", "There was a problem updating your profile.");
          console.error("Error updating font size: ", error);
        });
    } else {
      // Handle user not found case
      Alert.alert("Update Failed", "User not found.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Small" onPress={() => updateFontSize('small')} />
      <Button title="Medium" onPress={() => updateFontSize('medium')} />
      <Button title="Large" onPress={() => updateFontSize('large')} />
    </View>
  );
};

export default FontSettingsScreen;
