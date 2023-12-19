import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';

const ProfileEditScreen = () => {
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [bloodType, setBloodType] = useState('');
  const [visible, setVisible] = useState(false);

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
      updates['/users/' + user.uid + '/age'||0] = age;
      updates['/users/' + user.uid + '/height'||0] = height;
      updates['/users/' + user.uid + '/weight'||0] = weight;
      updates['/users/' + user.uid + '/bloodType'] = bloodType;



      await update(ref(db), updates);
      Alert.alert('Profile Updated', 'Your profile has been updated successfully.', [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);


    }
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>

      <View>
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
        <TextInput placeholder="Surname" value={surname} onChangeText={setSurname} />
        <TextInput placeholder="City" value={city} onChangeText={setCity} />
        <TextInput
  placeholder="Age"
  value={age === '' ? '' : age.toString()}
  onChangeText={text => {
    const num = parseInt(text);
    setAge(isNaN(num) ? '' : num);
  }}
  keyboardType="numeric"
/>
<TextInput
  placeholder="Height"
  value={height === '' ? '' : height.toString()}
  onChangeText={text => {
    const num = parseInt(text);
    setHeight(isNaN(num) ? '' : num);
  }}
  keyboardType="numeric"
/>
<TextInput
  placeholder="Weight"
  value={weight === '' ? '' : weight.toString()}
  onChangeText={text => {
    const num = parseInt(text);
    setWeight(isNaN(num) ? '' : num);
  }}
  keyboardType="numeric"
/>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} title="Select Blood Type" />}
        >
          {bloodTypes.map((type, index) => (
            <Menu.Item key={index} title={type} onPress={() => { setBloodType(type); closeMenu(); }} />
          ))}
        </Menu>
        <Text>Selected Blood Type: {bloodType}</Text>


        <Button title="Save" onPress={handleSave} />
      </View>
    </Provider>
  );
};

export default ProfileEditScreen;
