import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, User } from 'firebase/auth';
import { getDatabase, ref, onValue, update, DatabaseReference } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

interface UserData {
  name: string;
  surname?: string;
  city: string;
  age?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  role?: string;
}

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [role, setRole] = useState('');

  const auth = getAuth();
  const user: User | null = auth.currentUser;
  const db = getDatabase();

  useEffect(() => {
    if (user) {
      const userRef: DatabaseReference = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data: UserData = snapshot.val() as UserData;
        setName(data.name);
        setSurname(data.surname || '');
        setCity(data.city);
        setAge(data.age || '');
        setHeight(data.height || '');
        setWeight(data.weight || '');
        setBloodType(data.bloodType || '');
        setRole(data.role || '');
      });
    }
  }, [user, db]);

  const handleSave = async () => {
    try {
      if (user) {
        const updates: Record<string, any> = {};
        updates['/users/' + user.uid + '/name'] = name;
        updates['/users/' + user.uid + '/city'] = city;

        // Only update other fields if they are not empty
        if (surname) updates['/users/' + user.uid + '/surname'] = surname;
        if (age) updates['/users/' + user.uid + '/age'] = age;
        if (height) updates['/users/' + user.uid + '/height'] = height;
        if (weight) updates['/users/' + user.uid + '/weight'] = weight;
        if (bloodType) updates['/users/' + user.uid + '/bloodType'] = bloodType;

        await update(ref(db), updates);
        Alert.alert('Profile Updated', 'Your profile has been updated successfully.', [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Update Failed', 'There was an error updating your profile.', [
        { text: "OK" }
      ]);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="City" value={city} onChangeText={setCity} />
      {role === 'patients' && (
        <>
          <TextInput placeholder="Surname" value={surname} onChangeText={setSurname} />
          <TextInput placeholder="Age" value={age} onChangeText={setAge} />
          <TextInput placeholder="Height" value={height} onChangeText={setHeight} />
          <TextInput placeholder="Weight" value={weight} onChangeText={setWeight} />
          <TextInput placeholder="Blood Type" value={bloodType} onChangeText={setBloodType} />
        </>
      )}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default ProfileEditScreen;
