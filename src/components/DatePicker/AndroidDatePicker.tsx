import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerProps } from '.';
import Input from '../Input';

function AndroidDatePicker(props: DatePickerProps) {
  const { date, onChange } = props;
  const [selectedDate, setSelectedDate] = useState(date);
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Input
        value={dayjs(date).format('DD/MM/YYYY')}
        id="date-picker-date"
        editable={false}
      />
      <Button onPress={() => setVisible(true)}>Select another date</Button>

      {visible && (
        <DateTimePicker
          testID="android-date-picker"
          value={selectedDate}
          mode="date"
          is24Hour={true}
          onChange={(event, newDate) => {
            setVisible(false);

            if (event.type === 'set' && newDate) {
              setSelectedDate(newDate);
              onChange(newDate);
            }
          }}
        />
      )}
    </View>
  );
}

export default AndroidDatePicker;
