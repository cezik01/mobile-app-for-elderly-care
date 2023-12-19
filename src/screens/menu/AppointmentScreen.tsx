import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import {User, getAuth, onAuthStateChanged} from 'firebase/auth';
import {getDatabase,ref,push,onValue,remove,update,get,} from 'firebase/database';
import firebaseConfig from 'config/firebaseConfig';
import CustomDatePicker from 'components/Modal/DateTimePicker/DateTimePicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

interface AppointmentReminder {
  id: string;
  hospitalName: string;
  department: string;
  doctorName: string;
  date: string;
  hour: string;
  notificationId?: string;
}

const AppointmentScreen = () => {
  const [reminders, setReminders] = useState<AppointmentReminder[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [hospitalName, setHospitalName] = useState('');
  const [department, setDepartment] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [hour, setHour] = useState('');

  const departments = ['Cardiology', 'Dermatology', 'Neurology', 'Oncology', 'Pediatrics'];
  
  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        handleNotification(notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(subscription);
    };
  }, []);
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const uid = user.uid;
        const remindersRef = ref(db, `users/${uid}/appointmentReminders`);
        const unsubscribe = onValue(remindersRef, (snapshot) => {
          const fetchedReminders = snapshot.val();
          const formattedReminders = fetchedReminders ? Object.keys(fetchedReminders).map(key => ({
            ...fetchedReminders[key],
            id: key
          })) : [];
          setReminders(formattedReminders);
        });

        return () => unsubscribe();
      }
    });

    return () => authStateChanged();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need notification permissions to make this work!');
    }
  }
  const handleNotification = (notification: Notifications.Notification) => {
    const { title, body } = notification.request.content;
    const reminderId = notification.request.content.data?.reminderId;

    const alertTitle = title ?? 'Notification';
    const alertBody = body ?? '';

    Alert.alert(
      alertTitle,
      alertBody,
      [
        { text: "Dismiss", onPress: () => reminderId && updateReminderStatus(reminderId, 'dismissed') },
        { text: "View", onPress: () => {/* Navigate to a specific screen or take some action */} }
      ],
      { cancelable: true }
    );
  };
  const updateReminderStatus = (reminderId: string, status: 'accepted' | 'dismissed' | 'viewed') => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }
    const uid = auth.currentUser.uid;
    update(ref(db, `users/${uid}/appointmentReminders/${reminderId}`), { status });
  };
  
  const addAppointmentReminder = async () => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }
  
    const uid = auth.currentUser.uid;
    const newAppointmentReminder = {
      hospitalName: hospitalName,
      department: department,
      doctorName: doctorName,
      date: selectedDate.toString(),
      hour: hour,
    };
  
    const reminderRef = await push(ref(db, `users/${uid}/appointmentReminders`), newAppointmentReminder);
  
    if (reminderRef.key === null) {
      console.error("Failed to get appointment reminder ID");
      return;
    }
  };

  const deleteAppointmentReminder = async (id: string, notificationId?: string) => {
    // Similar logic to deleteReminder, adapted for appointments
    // ...
  };

  async function scheduleNotification(hospitalName: string, doctorName: string, date: Date, reminderId: string) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Appointment Reminder',
        body: `Appointment at ${hospitalName} with Dr. ${doctorName} on ${date.toLocaleString()}`,
        data: { reminderId },
        sound: 'default',
      },
      trigger: date,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Appointment Reminder</Text>
      <TextInput
        style={styles.input}
        value={hospitalName}
        onChangeText={setHospitalName}
        placeholder="Enter hospital name"
      />
      <Picker
        selectedValue={department}
        onValueChange={(itemValue) => setDepartment(itemValue)}
        style={styles.picker}
      >
        {departments.map((dept, index) => (
          <Picker.Item key={index} label={dept} value={dept} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        value={doctorName}
        onChangeText={setDoctorName}
        placeholder="Enter doctor's name"
      />
      <CustomDatePicker
        onDateChange={(newDate) => setSelectedDate(newDate)}
        onTimeChange={(newTime) => {
          // Handle time change if necessary
        }}
      />
      
      <Button title="Add Reminder" onPress={addAppointmentReminder} />
      <FlatList
      data={reminders}
      renderItem={({ item }) => (
        <View style={styles.reminderItem}>
          <Text style={styles.reminderText}>Hospital: {item.hospitalName}</Text>
          <Text style={styles.reminderText}>Department: {item.department}</Text>
          <Text style={styles.reminderText}>Doctor: {item.doctorName}</Text>
          <Text style={styles.reminderText}>Date: {item.date}</Text>
          <Text style= {styles.reminderText}>Hour: {item.hour}</Text>
          
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
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  reminderItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  reminderText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AppointmentScreen;
