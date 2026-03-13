import dayjs from 'dayjs';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { DATE_FORMAT } from '@/src/constants';
import { WHITE } from '@/src/constants/colors';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import { DatePickerProps } from '.';

function WebDatePicker(props: DatePickerProps) {
  const { date, onChange } = props;

  const [open, setOpen] = useState(false);
  const formattedDate = dayjs(date).format(DATE_FORMAT);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = (event: { date: CalendarDate }) => {
    const selectedDate = event.date;
    selectedDate && onChange(selectedDate);
    setOpen(false);
  };

  return (
    <View>
      <Button
        textColor={WHITE}
        onPress={handleOpen}
        uppercase={false}
        mode="outlined"
      >
        {formattedDate}
      </Button>
      <DatePickerModal
        locale="fr"
        mode="single"
        visible={open}
        onDismiss={handleClose}
        date={date}
        startWeekOnMonday
        onConfirm={handleConfirm}
        presentationStyle="formSheet"
      />
    </View>
  );
}

export default WebDatePicker;
