import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';
import i18n from 'common/i18n/i18n';
import styles from './styles';
import { ScrollView } from 'native-base';
import { ProfileEditScreenProps } from 'types/screen/ProfileEditScreenProps';

const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({ route }) => {
  const { role } = route.params;
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

  const isPatient = role === 'patient';

  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  useEffect(() => {
    if (user) {
      const userRef = ref(db, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val() || {};
        setName(data.name || '');
        setSurname(data.surname || '');
        setCity(data.city || '');
        if (isPatient) {
          setAge(data.age || '');
          setHeight(data.height || '');
          setWeight(data.weight || '');
          setBloodType(data.bloodType || '');
        }
      });
    }
  }, [user, isPatient]);

  const handleSave = async () => {
    if (user) {
      const updates: { [key: string]: any } = {};
      updates['/users/' + user.uid + '/name'] = name;
      updates['/users/' + user.uid + '/surname'] = surname;

      if (isPatient) {
        updates['/users/' + user.uid + '/city'] = city;
        updates['/users/' + user.uid + '/age'] = age;
        updates['/users/' + user.uid + '/height'] = height;
        updates['/users/' + user.uid + '/weight'] = weight;
        updates['/users/' + user.uid + '/bloodType'] = bloodType;
      } else {
        updates['/users/' + user.uid + '/city'] = city;
      }

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
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('Name')}:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('Surname')}:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your surname"
              value={surname}
              onChangeText={setSurname}
            />
          </View>

          {/* Patient-specific Input Fields */}
          {isPatient && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t('Age')}:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your age"
                  value={age === '' ? '' : age.toString()}
                  onChangeText={text => setAge(text ? parseInt(text, 10) : '')}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t('Height')}:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your height in cm"
                  value={height === '' ? '' : height.toString()}
                  onChangeText={text => setHeight(text ? parseInt(text, 10) : '')}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t('Weight')}:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your weight in kg"
                  value={weight === '' ? '' : weight.toString()}
                  onChangeText={text => setWeight(text ? parseInt(text, 10) : '')}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t('BloodType')}:</Text>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <Text onPress={openMenu} style={styles.dropdownAnchor}>
                      {bloodType || "Select Blood Type"}
                    </Text>
                  }>
                  {bloodTypes.map((type, index) => (
                    <Menu.Item
                      key={index}
                      title={type}
                      onPress={() => {
                        setBloodType(type);
                        closeMenu();
                      }}
                    />
                  ))}
                </Menu>
              </View>
            </>
          )}

          {/* City Input Field - common for both roles */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{i18n.t('City')}:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={city}
              onChangeText={setCity}
            />
          </View>

          {/* Save Button */}
          <Button onPress={handleSave} labelStyle={styles.buttonText}>{i18n.t('Save')}</Button>
        </View>
      </ScrollView>
    </Provider>
  );
};

export default ProfileEditScreen;
