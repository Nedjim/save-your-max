import dayjs from 'dayjs';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { TURQUOISE, WHITE } from '../constants/colors';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

const DATE_FORMAT = 'DD/MM/YYYY';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: TURQUOISE,
  },
};

type DatePickerProps = {
  date: CalendarDate;
  onChange: (event: { date: CalendarDate }) => void;
};

export default function DatePicker(props: DatePickerProps) {
  const { date, onChange } = props;
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Button
        textColor={WHITE}
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined"
      >
        {dayjs(date).format(DATE_FORMAT)}
      </Button>
      {open && (
        <PaperProvider theme={theme}>
          <DatePickerModal
            locale="fr"
            mode="single"
            visible={open}
            onDismiss={() => {
              setOpen(false);
            }}
            date={date}
            startWeekOnMonday
            onConfirm={(event) => {
              onChange(event);
              setOpen(false);
            }}
            presentationStyle="formSheet"
          />
        </PaperProvider>
      )}
    </View>
  );
}
