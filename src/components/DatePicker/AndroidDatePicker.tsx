import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import EditListButton from '../Buttons/EditListButton';
import { WHITE } from '@/src/constants/colors';
import { DatePickerProps } from '.';

function AndroidDatePicker(props: DatePickerProps) {
  const { date, onChange, ...rest } = props;
  const [selectedDate, setSelectedDate] = useState(date);
  const [visible, setVisible] = useState(false);
  const formattedDate = dayjs(date).format('DD/MM/YYYY');

  return (
    <View style={styles.androidDatePicker}>
      <TextInput
        id="android-date-picker"
        accessibilityLabelledBy="android-date-picker"
        style={styles.input}
        value={formattedDate}
        autoCorrect={false}
        editable={false}
        accessibilityLabel="input"
        placeholderTextColor="#7A8699"
        autoCapitalize="none"
        autoComplete="off"
        {...rest}
      />
      <EditListButton name="pencil" onPress={() => setVisible(true)} />
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
          {...rest}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  androidDatePicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(20, 30, 40, 0.6)',
    color: WHITE,
    borderRadius: 8,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
});

export default AndroidDatePicker;
