import React, { useContext } from 'react';
import { View, Button, Alert } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import FontSizeContext from '../../context/FontSizeContext';
import { FontSettingsScreenProps } from 'types/FontSettingsScreenProps';

const FontSettingsScreen = ({ navigation }: FontSettingsScreenProps) => {
  const fontSizeContext = useContext(FontSizeContext);

  if (!fontSizeContext) {
    console.error('FontSizeContext not found');
    return null;
  }

  const { setFontSize } = fontSizeContext;

  const updateFontSize = (size: string) => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const db = getDatabase();
      const fontSizeRef = ref(db, `users/${userId}/preferences/fontSize`);

      set(fontSizeRef, size)
        .then(() => {
          setFontSize(size);

          Alert.alert("Profile Updated", "Your font size preference has been saved.");
        })
        .catch((error) => {
          Alert.alert("Update Failed", "There was a problem updating your profile.");
          console.error("Error updating font size: ", error);
        });
    } else {
      Alert.alert("Update Failed", "User not found.");
    }
  };

  console.log("Current font size in context:", fontSizeContext.fontSize);
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Small" onPress={() => updateFontSize('small')} />
      <Button title="Medium" onPress={() => updateFontSize('medium')} />
      <Button title="Large" onPress={() => updateFontSize('large')} />
    </View>
  );
};

export default FontSettingsScreen;
