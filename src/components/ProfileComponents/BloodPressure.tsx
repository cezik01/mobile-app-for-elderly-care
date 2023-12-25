import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Provider } from 'react-native-paper';
import { validateNumericInput } from 'helpers/validationSchemas/numericInputValidation';
import i18n from 'common/i18n/i18n';
import BloodPressureEntry from 'types/BloodPressureEntry';

const BloodPressureScreen = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [loading, setLoading] = useState(true);
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureEntry[]>([]);

  const auth = getAuth();
  const database = getDatabase();
  const userId = auth.currentUser?.uid;
  const bpRef = ref(database, 'bloodPressure/' + userId);

  const [isSystolicValid, setIsSystolicValid] = useState(true);
  const [isDiastolicValid, setIsDiastolicValid] = useState(true);

  useEffect(() => {
    const unsubscribe = onValue(bpRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          date: key,
          ...data[key]
        }));
        setBloodPressureData(formattedData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = () => {
    const newEntry = {
      systolic: parseInt(systolic, 10),
      diastolic: parseInt(diastolic, 10),
    };
    const newRef = ref(database, 'bloodPressure/' + userId + '/' + Date.now());
    update(newRef, newEntry).catch((error) => {
      Alert.alert('Error', error.message);
    });
  };

  const renderItem = ({ item }: { item: BloodPressureEntry }) => (
    <View style={styles.listItem}>
      <Text>Date: {item.date}</Text>
      <Text>Systolic: {item.systolic}</Text>
      <Text>Diastolic: {item.diastolic}</Text>
    </View>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <TextInput
          placeholder='Enter Systolic'
          value={systolic}
          onChangeText={(text) => {
            const { validText, isValid } = validateNumericInput(text);
            setSystolic(validText);
            setIsSystolicValid(isValid);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder='Enter Diastolic'
          value={diastolic}
          onChangeText={(text) => {
            const { validText, isValid } = validateNumericInput(text);
            setDiastolic(validText);
            setIsDiastolicValid(isValid);
          }}
          style={styles.input}
        />
        {!isSystolicValid && (
          <Text style={styles.warningText}>{i18n.t('EnterValidNumber')}</Text>
        )}
        {!isDiastolicValid && (
          <Text style={styles.warningText}>{i18n.t('EnterValidNumber')}</Text>
        )}
        <Button title='Submit' onPress={handleSubmit} />
        {!loading && (
          <ScrollView style={styles.scrollView}>
            <FlatList
              data={bloodPressureData}
              renderItem={renderItem}
              keyExtractor={item => item.date}
            />
          </ScrollView>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#6495ED',
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    padding: 10,
  },
  warningText: {
    color: 'red',
  },
  scrollView: {
    width: '100%',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  }
});

export default BloodPressureScreen;
