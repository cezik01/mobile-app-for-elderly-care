import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Notification } from 'expo-notifications';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, onValue, remove, update, get } from 'firebase/database';
import firebaseConfig from 'config/firebaseConfig';
import CustomDatePicker from 'components/Modal/DateTimePicker/DateTimePicker';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import i18n from 'common/i18n/i18n';
import { validateNumericInput } from 'helpers/validationSchemas/numericInputValidation';
import { ReminderScreensProps } from 'types/ReminderScreensProps';
import { Reminder } from 'types/MedicationReminderProps';
import { styles } from './styles';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


const MedicationScreen = ({ navigation }: ReminderScreensProps) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [date, setDate] = useState(new Date());
  const [medicationName, setMedicationName] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');
  const [isInvalidInput, setIsInvalidInput] = useState(false);

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

  const handleDosageChange = (text: string) => {
    const { validText, isValid } = validateNumericInput(text);
    setMedicationDosage(validText);
    setIsInvalidInput(!isValid);
  };

  const updateReminderStatus = (reminderId: string, status: 'accepted' | 'dismissed') => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return;
    }
    const uid = auth.currentUser.uid;
    update(ref(db, `users/${uid}/reminders/${reminderId}`), { status });
  };

  const handleNotification = (notification: Notification) => {
    const { title, body } = notification.request.content;
    const reminderId = notification.request.content.data?.reminderId;

    const alertTitle = title ?? 'Notification';
    const alertBody = body ?? '';

    Alert.alert(
      alertTitle,
      alertBody,
      [
        { text: "Delay", onPress: () => showSnoozeOptions(reminderId) },
        { text: "Dismiss", onPress: () => reminderId && updateReminderStatus(reminderId, 'dismissed') },
        { text: "Accept", onPress: () => reminderId && updateReminderStatus(reminderId, 'accepted') }
      ],
      { cancelable: true }
    );
  };

  const showSnoozeOptions = (reminderId: string) => {
    const snoozeOptions = [
      { text: '1 min', onPress: () => snoozeReminder(reminderId, 1) },
      { text: '2 min', onPress: () => snoozeReminder(reminderId, 2) },
      { text: '3 min', onPress: () => snoozeReminder(reminderId, 3) },
      { text: '4 min', onPress: () => snoozeReminder(reminderId, 4) },
      { text: '5 min', onPress: () => snoozeReminder(reminderId, 5) },
      { text: '6 min', onPress: () => snoozeReminder(reminderId, 6) },
      { text: '7 min', onPress: () => snoozeReminder(reminderId, 7) },
      { text: '8 min', onPress: () => snoozeReminder(reminderId, 8) },
      { text: '9 min', onPress: () => snoozeReminder(reminderId, 9) },
      { text: '10 min', onPress: () => snoozeReminder(reminderId, 10) },
    ];

    Alert.alert(
      "Snooze Reminder",
      "Select Delay time:",
      snoozeOptions,
      { cancelable: true }
    );
  }

  const snoozeReminder = async (reminderId: string, minutes: number) => {
    const snoozeTime = new Date();
    snoozeTime.setMinutes(snoozeTime.getMinutes() + minutes);

    const reminderDetails = await getReminderDetails(reminderId);
    if (reminderDetails) {
      await scheduleNotification(reminderDetails.name, reminderDetails.dosage, snoozeTime, reminderId);
    }
  };

  const getReminderDetails = async (reminderId: string) => {
    if (!auth.currentUser) {
      console.log('No user logged in');
      return null;
    }

    const uid = auth.currentUser.uid;
    const reminderRef = ref(db, `users/${uid}/reminders/${reminderId}`);
    try {
      const snapshot = await get(reminderRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch reminder details", error);
      return null;
    }
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
      status: 'none',
    };

    const reminderRef = await push(ref(db, `users/${uid}/reminders`), newReminder);

    if (reminderRef.key === null) {
      console.error("Failed to get reminder ID");
      return;
    }

    const reminderId = reminderRef.key;

    let notificationId = '';
    try {
      notificationId = await scheduleNotification(medicationName, medicationDosage, date, reminderId);
    } catch (error) {
      console.error("Failed to schedule notification", error);
    }

    update(ref(db, `users/${uid}/reminders/${reminderId}`), { notificationId });
    setMedicationName('');
    setMedicationDosage('');
    setDate(new Date());
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

  async function scheduleNotification(name: string, dosage: string, date: Date, reminderId: string) {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medication Reminder',
        body: `Time to take your medication: ${name}, Dosage: ${dosage}`,
        data: { reminderId },
        sound: 'default',
        categoryIdentifier: 'MEDICATION_REMINDER',
      },
      trigger: date,
    });
  }

  Notifications.setNotificationCategoryAsync('MEDICATION_REMINDER', [
    {
      identifier: 'accept',
      buttonTitle: 'Accept',
      options: { opensAppToForeground: true },
    },
    {
      identifier: 'dismiss',
      buttonTitle: 'Dismiss',
      options: { opensAppToForeground: false },
    },
  ]);

  Notifications.addNotificationResponseReceivedListener(response => {
    const actionIdentifier = response.actionIdentifier;
    const reminderId = response.notification.request.content.data.reminderId;

    if (reminderId) {
      const newStatus = actionIdentifier === 'accept' ? 'accepted' : 'dismissed';
      updateReminderStatus(reminderId, newStatus);
    }
  });

  const handleHelpPress = () => {
    navigation.navigate('Help Screen')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('EnterMedication')}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMedicationName}
        value={medicationName}
        placeholder="Enter medication name"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleDosageChange}
        value={medicationDosage}
        placeholder="Enter medication dosage"
      />
      {isInvalidInput && <Text style={styles.warningText}>{i18n.t('EnterValidNumber')}</Text>}
      <View style={styles.iconScheduleContainer}>
        <Image
          source={require('../../../../assets/reminder/DateTimeSchedule.png')}
          style={styles.scheduleIcon}
        />
        <CustomDatePicker
          onDateChange={(newDate) => setDate(newDate)}
          onTimeChange={(newTime) => setDate(newTime)}
        />
      </View>
      <Button onPress={addReminder} title="Add Reminder" />
      <FlatList
        data={reminders}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.reminderItem}>
              {item.status === 'accepted' && <MaterialIcons name="check" size={20} style={styles.checkIcon} />}
              {item.status === 'dismissed' && <MaterialIcons name="close" size={20} style={styles.closeIcon} />}
              <Text>{i18n.t('MedicationName')}: {item.name} - {i18n.t('DateWithTime')}: {new Date(item.date).toLocaleString()} - {i18n.t('Dosage')}: {item.dosage}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteReminder(item.id, item.notificationId)}>
              <Text style={styles.deleteText}>{i18n.t('Delete')}</Text>
            </TouchableOpacity>
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

export default MedicationScreen;