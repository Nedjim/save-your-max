import { Platform } from 'react-native';
import DefaultDatePicker from './DefaultDatePicker';
import WebDatePicker from './WebDatePicker';

export type DatePickerProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export default function DatePicker(props: DatePickerProps) {
  if (Platform.OS === 'web') {
    return <WebDatePicker {...props} />;
  }

  return <DefaultDatePicker {...props} />;
}
