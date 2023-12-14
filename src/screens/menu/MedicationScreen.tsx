import React, { useEffect, useState } from 'react';
import { Text, View, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, remove, update } from 'firebase/database';
import firebaseConfig from 'config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

interface Reminder {
  id: string;
  name: string;
  date: string;
  notificationId?: string;
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

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

    async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need notification permissions to make this work!');
    }
  }

  const addReminder = async () => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }
  
    const uid = auth.currentUser.uid;
    const newReminder = {
      name: medicationName,
      date: date.toString(),
    };
  
    const reminderRef = push(ref(db, `users/${uid}/reminders`), newReminder);
  
    let notificationId = '';
    try {
      notificationId = await scheduleNotification(medicationName, date);
      console.log(`Notification scheduled with ID: ${notificationId}`);
    } catch (error) {
      console.error("Failed to schedule notification", error);
    }
  
    update(ref(db, `users/${uid}/reminders/${reminderRef.key}`), { notificationId });
  
    setMedicationName('');
  };
  
  const deleteReminder = async (id: string, notificationId?: string) => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }

    const uid = auth.currentUser.uid;
    remove(ref(db, `users/${uid}/reminders/${id}`));

    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
  };

async function scheduleNotification(name: string, date: Date) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Medication Reminder',
      body: `Time to take your medication: ${name}`,
    },
    trigger: date,
  });
}

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
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
          }}
        />
      )}
      <Button onPress={addReminder} title="Add Reminder" />
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text>{item.name} - {new Date(item.date).toLocaleString()}</Text>
            <TouchableOpacity onPress={() => deleteReminder(item.id, item.notificationId)}>
              <Text style={styles.deleteText}>Delete</Text>
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
