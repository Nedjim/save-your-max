import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DatePickerProps } from '.';

const IOSDatePicker = (props: DatePickerProps) => {
  const { date, onChange } = props;

  const [selectedDate, setSelectedDate] = useState(date);

  return (
    <View style={styles.iosDatePicker}>
      <DateTimePicker
        testID="ios-date-picker"
        value={selectedDate}
        mode="date"
        is24Hour={true}
        themeVariant="dark"
        onChange={(_, newDate) => {
          if (newDate) {
            setSelectedDate(newDate);
            onChange(newDate);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iosDatePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: 16,
  },
});

export default IOSDatePicker;
