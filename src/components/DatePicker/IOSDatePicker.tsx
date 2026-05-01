import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DatePickerProps } from '.';

const IOSDatePicker = (props: DatePickerProps) => {
  const { date, onChange, ...rest } = props;

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
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iosDatePicker: {
    flex: 1,
    marginBottom: 8,
  },
});

export default IOSDatePicker;
