import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
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
  dosage: string;
  notificationId?: string;
}

const MedicationScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');

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

    const subscription = Notifications.addNotificationReceivedListener(
      (notification: Notification) => {
        handleNotification(notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(subscription);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need notification permissions to make this work!');
    }
  }

  const handleNotification = (notification: Notification) => {
    const { title, body } = notification.request.content;

    const alertTitle = title ?? 'Notification';
    const alertBody = body ?? '';

    Alert.alert(
      alertTitle,
      alertBody,
      [
        { text: "Dismiss", onPress: () => console.log("Notification dismissed") },
        { text: "Accept", onPress: () => console.log("Notification accepted") }
      ],
      { cancelable: true }
    );
  };

  const addReminder = async () => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }
  
    const uid = auth.currentUser.uid;
    const newReminder = {
      name: medicationName,
      date: date.toString(),
      dosage: medicationDosage,
    };
  
    const reminderRef = push(ref(db, `users/${uid}/reminders`), newReminder);
  
    let notificationId = '';
    try {
      notificationId = await scheduleNotification(medicationName, medicationDosage, date);
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

  async function scheduleNotification(name: string, dosage: string, date: Date) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medication Reminder',
        body: `Time to take your medication: ${name}, Dosage: ${dosage}`,
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
       <TextInput
        style={styles.input}
        onChangeText={setMedicationDosage}
        value={medicationDosage}
        placeholder="Enter medication dosage"
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
            <Text>Medication Name: {item.name} - Date&Time: {new Date(item.date).toLocaleString()} - Dosage: {item.dosage}</Text>
            <TouchableOpacity onPress={() => deleteReminder(item.id, item.notificationId)}>
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
