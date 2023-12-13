import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import firebaseConfig from 'config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

interface Reminder {
  id: string;
  name: string;
  date: string;
}

const MedicationScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [medicationName, setMedicationName] = useState('');

  useEffect(() => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    const uid = auth.currentUser.uid;
    const remindersRef = ref(db, `users/${uid}/reminders`);
    const unsubscribe = onValue(remindersRef, (snapshot) => {
      const fetchedReminders = snapshot.val();
      const formattedReminders = fetchedReminders ? Object.keys(fetchedReminders).map(key => ({
        ...fetchedReminders[key],
        id: key
      })) : [];
      setReminders(formattedReminders);
    });

    return () => unsubscribe();
  }, []);

  const addReminder = () => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    const uid = auth.currentUser.uid;
    const newReminder = {
      name: medicationName,
      date: date.toString(),
    };

    push(ref(db, `users/${uid}/reminders`), newReminder);
    setMedicationName('');
    // Optionally schedule a notification here
  };

  const deleteReminder = (id: string) => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    const uid = auth.currentUser.uid;
    remove(ref(db, `users/${uid}/reminders/${id}`));
    // Optionally cancel the notification here
  };

  return (
    <View style={styles.container}>
      <Text>Medication Reminder</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMedicationName}
        value={medicationName}
        placeholder="Enter medication name"
      />
      <Button onPress={() => setShow(true)} title="Set Reminder" />
      {show && (
        <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => {
          setDate(selectedDate || date);
          setShow(false);
        }}
      />      
      )}
      <Button onPress={addReminder} title="Add Reminder" />
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text>{item.name} - {new Date(item.date).toLocaleString()}</Text>
            <TouchableOpacity onPress={() => deleteReminder(item.id)}>
              <Text style={styles.deleteText}> Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  deleteText: {
    color: 'red',
  },
});

export default MedicationScreen;
