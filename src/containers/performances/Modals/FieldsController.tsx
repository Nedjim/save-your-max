import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <View style={styles.fields}>
      <View>
        <Label label={t('performance.weight')} nativeId="performance-weight" />
        <Controller
          control={control}
          name="weight"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              id="performance-weight"
              placeholder={t('performance.weight_placeholder')}
            />
          )}
        />
      </View>
      <View>
        <Label label={t('performance.reps')} nativeId="performance-reps" />
        <Controller
          control={control}
          name="reps"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              id="performance-reps"
              placeholder={t('performance.reps_placeholder')}
            />
          )}
        />
      </View>
      <View style={styles.datePicker}>
        <Label label={t('performance.date')} nativeId="performance-date" />
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
