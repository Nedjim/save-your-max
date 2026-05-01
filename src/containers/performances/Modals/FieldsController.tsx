import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import DatePicker from '@/src/components/DatePicker';
import {
  EditPerformanceFormValues,
  EditPerformanceZodValues,
} from '@/src/types';
import { today } from '@/src/utils/date';

type FieldsControllerProps = {
  control: Control<
    EditPerformanceFormValues,
    unknown,
    EditPerformanceZodValues
  >;
};

function FieldsController(props: FieldsControllerProps) {
  const { control } = props;

  return (
    <View style={styles.fields}>
      <View>
        <Label label="Weight (kg)" nativeId="performance-weight" />
        <Controller
          control={control}
          name="weight"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              id="performance-weight"
              placeholder="ex: 34 kg"
            />
          )}
        />
      </View>
      <View>
        <Label label="Reps" nativeId="performance-reps" />
        <Controller
          control={control}
          name="reps"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              id="performance-reps"
              placeholder="ex: 10 repetitions"
            />
          )}
        />
      </View>
      <View style={styles.datePicker}>
        <Label label="Date" nativeId="performance-date" />
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange } }) => {
            const date = value ? new Date(value) : today;

            return (
              <DatePicker
                date={date}
                onChange={(newDate) => {
                  onChange(newDate.toISOString());
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 16,
  },
  datePicker: {
    marginBottom: 24,
  },
});

export default FieldsController;
