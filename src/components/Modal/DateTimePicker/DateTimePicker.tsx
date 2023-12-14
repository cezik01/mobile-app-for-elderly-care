import React from 'react';
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Button } from 'react-native-paper';
import styles from './styles';

type DateParams = {
  dates: Date[];
};

type TimeParams = {
  hours: number;
  minutes: number;
};

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
  onTimeChange: (time: Date) => void;
}

export default function CustomDatePicker({ onDateChange, onTimeChange }: CustomDatePickerProps) {

  const [dates, setDates] = React.useState([new Date()]);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [openTimePicker, setOpenTimePicker] = React.useState(false);

  const onDismissDate = React.useCallback(() => {
    setOpenDatePicker(false);
  }, []);

  const onDismissTime = React.useCallback(() => {
    setOpenTimePicker(false);
  }, []);

  const onConfirmDate = React.useCallback((params: DateParams) => {
    setOpenDatePicker(false);
    setDates(params.dates);
    onDateChange(params.dates[0]);
    setOpenTimePicker(true);
  }, [onDateChange]);

  const onConfirmTime = React.useCallback((params: TimeParams) => {
    setOpenTimePicker(false);
    const newTime = new Date(time.setHours(params.hours, params.minutes));
    setTime(newTime);
    onTimeChange(newTime);
  }, [onTimeChange, time]);

  return (
    <View style={styles.container}>
      <Button onPress={() => setOpenDatePicker(true)} uppercase={false} mode="outlined">
        Pick Date and Time
      </Button>
      <DatePickerModal
        locale="en"
        mode="multiple"
        visible={openDatePicker}
        onDismiss={onDismissDate}
        dates={dates}
        onConfirm={onConfirmDate}
      />
      <TimePickerModal
        visible={openTimePicker}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}
        hours={time.getHours()}
        minutes={time.getMinutes()}
      />
    </View>
  );
}
