import React from 'react';
import { View, Button } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import styles from './styles';

type TimeParams = {
  hours: number;
  minutes: number;
};

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void;
  onTimeChange: (time: Date) => void;
}

export default function CustomDatePicker({ onDateChange, onTimeChange }: CustomDatePickerProps) {
  const [date, setDate] = React.useState(new Date());
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [time, setTime] = React.useState(new Date());
  const [openTimePickerModal, setOpenTimePickerModal] = React.useState(false);

  const onDismissDate = React.useCallback(() => {
    setOpenDatePicker(false);
  }, []);

  const onConfirmDate = (params: { dates: Date[] }) => {
    setOpenDatePicker(false);
    if (params.dates.length > 0) {
      setDate(params.dates[0]);
      setOpenTimePickerModal(true);
      onDateChange(params.dates[0]);
    }
  };
  

  const onDismissTime = () => {
    setOpenTimePickerModal(false);
  };

  const onConfirmTime = (params: TimeParams) => {
    setOpenTimePickerModal(false);
    const newTime = new Date(time.setHours(params.hours, params.minutes));
    setTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setOpenDatePicker(true)} title="Pick Date and Time" />
      <DatePickerModal
        locale="en"
        mode="multiple"
        visible={openDatePicker}
        onDismiss={onDismissDate}
        date={date}
        onConfirm={onConfirmDate}
      />
      <TimePickerModal
        visible={openTimePickerModal}
        onDismiss={onDismissTime}
        onConfirm={onConfirmTime}
        hours={time.getHours()}
        minutes={time.getMinutes()}
      />
    </View>
  );
}
