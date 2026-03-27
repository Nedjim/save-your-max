import { Platform } from 'react-native';
import { default as AndroidDatePicker } from './AndroidDatePicker';
import IOSDatePicker from './IOSDatePicker';
import WebDatePicker from './WebDatePicker';

export type DatePickerProps = {
  date: Date;
  onChange: (date: Date) => void;
};

export default function DatePicker(props: DatePickerProps) {
  if (Platform.OS === 'ios') {
    return <IOSDatePicker {...props} />;
  }
  if (Platform.OS === 'android') {
    return <AndroidDatePicker {...props} />;
  }
  return <WebDatePicker {...props} />;
}
