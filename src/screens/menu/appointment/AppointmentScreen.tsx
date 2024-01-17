import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, push, onValue, remove, update, get, } from 'firebase/database';
import firebaseConfig from 'config/firebaseConfig';
import CustomDatePicker from 'components/Modal/DateTimePicker/DateTimePicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { AppointmentReminder } from 'types/AppointmentReminderProps';
import i18n from 'common/i18n/i18n';
import { ReminderScreensProps } from 'types/ReminderScreensProps';
import { styles } from './styles';


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const AppointmentScreen = ({ navigation }: ReminderScreensProps) => {
  const [reminders, setReminders] = useState<AppointmentReminder[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
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
        { text: "View", onPress: () => { } }
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
    const dateTime = new Date(selectedDate);
    dateTime.setHours(selectedTime.getHours());
    dateTime.setMinutes(selectedTime.getMinutes());

    const newAppointmentReminder = {
      hospitalName: hospitalName,
      department: department,
      doctorName: doctorName,
      date: dateTime.toString(),
      hour: selectedTime.toLocaleTimeString(),
    };

    const reminderRef = await push(ref(db, `users/${uid}/appointmentReminders`), newAppointmentReminder);

    if (reminderRef.key === null) {
      console.error("Failed to get appointment reminder ID");
      return;
    }

    try {
      const notificationId = await scheduleNotification(hospitalName, doctorName, dateTime, reminderRef.key);
      await update(ref(db, `users/${uid}/appointmentReminders/${reminderRef.key}`), { notificationId });
    } catch (error) {
      console.error("Failed to schedule or update notification", error);
    }
  };


  const deleteAppointmentReminder = async (id: string, notificationId?: string) => {

  };

  async function scheduleNotification(hospitalName: string, doctorName: string, dateTime: Date, reminderId: string) {
    const notificationTime = new Date(dateTime);
    notificationTime.setHours(notificationTime.getHours() - reminderAdvance);

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Appointment Reminder',
        body: `Appointment at ${hospitalName} with Dr. ${doctorName} on ${dateTime.toLocaleString()}`,
        data: { reminderId },
        sound: 'default',
      },
      trigger: notificationTime,
    });
  }
  const [reminderAdvance, setReminderAdvance] = useState(1);




  const handleHelpPress = () => {
    navigation.navigate('Help Screen')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('AddAppointmentReminder')}</Text>
      <TextInput
        style={styles.input}
        value={hospitalName}
        onChangeText={setHospitalName}
        placeholder="Enter hospital's name"
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
        onTimeChange={(newTime) => setSelectedTime(newTime)}
      />
      <Picker
        selectedValue={reminderAdvance}
        onValueChange={(itemValue) => setReminderAdvance(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="1 hour before" value={1} />
        <Picker.Item label="2 hours before" value={2} />
      </Picker>

      <Button title="Add Reminder" onPress={addAppointmentReminder} />
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>{i18n.t('Hospital')}: {item.hospitalName}</Text>
            <Text style={styles.reminderText}>{i18n.t('Department')}: {item.department}</Text>
            <Text style={styles.reminderText}>{i18n.t('Doctor')}: {item.doctorName}</Text>
            <Text style={styles.reminderText}>{i18n.t('DateWithTime')}: {item.date}</Text>
            <Text style={styles.reminderText}>{i18n.t('Hour')}: {item.hour}</Text>

          </View>
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity onPress={handleHelpPress}
      >
        <View style={styles.questionMarkContainer}>
          <MaterialIcons name='help' style={styles.questionMarkIcon} size={25} />
          <Text style={styles.helpText}>
            {i18n.t('Help')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentScreen;