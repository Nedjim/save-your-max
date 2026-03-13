import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { View } from 'react-native';
import { DatePickerProps } from '.';

function DefaultDatePicker(props: DatePickerProps) {
  const { date, onChange } = props;

  const [selectedDate, setSelectedDate] = useState(date);

  return (
    <View>
      <DateTimePicker
        testID="default-date-picker"
        value={selectedDate}
        mode="date"
        is24Hour={true}
        onChange={(_, newDate) => {
          if (newDate) {
            setSelectedDate(newDate);
            onChange(newDate);
          }
        }}
      />
    </View>
  );
}

export default DefaultDatePicker;
