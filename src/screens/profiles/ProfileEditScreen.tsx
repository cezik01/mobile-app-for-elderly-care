import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue ,update} from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

const ProfileEditScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodType, setBloodType] = useState('');
  

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  useEffect(() => {
    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setName(data.name);
        setSurname(data.surname);
        setCity(data.city);
        setAge(data.age);
        setHeight(data.height);
        setWeight(data.weight);
        setBloodType(data.bloodType);
        
      });
    }
  }, []);

  const handleSave = async () => {
    if (user) {
      const updates: { [key: string]: any } = {};
      updates['/users/' + user.uid + '/name'] = name;
      updates['/users/' + user.uid + '/surname'] = surname;
      updates['/users/' + user.uid + '/city'] = city;
      updates['/users/' + user.uid + '/age'] = age;
      updates['/users/' + user.uid + '/height'] = height;
      updates['/users/' + user.uid + '/weight'] = weight;
      updates['/users/' + user.uid + '/bloodType'] = bloodType;
      
      
  
      await update(ref(db), updates);
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.', [
        { text: "OK", onPress: () => navigation.goBack() } 
      ]);
      
      
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Surname" value={surname} onChangeText={setSurname} />
      <TextInput placeholder="City" value={city} onChangeText={setCity} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} />
      <TextInput placeholder="Height" value={height} onChangeText={setHeight} />
      <TextInput placeholder="Weight" value={weight} onChangeText={setWeight} />
      <TextInput placeholder="Blood Type" value={bloodType} onChangeText={setBloodType} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default ProfileEditScreen;
