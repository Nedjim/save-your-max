import dayjs from 'dayjs';
import { memo, useCallback, useState } from 'react';
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

const DatePicker = (props: DatePickerProps) => {
  const { date, onChange } = props;
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
      <PaperProvider theme={theme}>
        <DatePickerModal
          locale="fr"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          startWeekOnMonday
          onConfirm={(event) => {
            onChange(event);
            setOpen(false);
          }}
        />
      </PaperProvider>
    </View>
  );
};

export default memo(DatePicker);
