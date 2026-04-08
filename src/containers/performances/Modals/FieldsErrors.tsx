import { FieldErrors } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import FormErrors from '@/src/components/Form/FormErrors';
import { EditPerformanceFormValues } from '@/src/types';

type FieldsErrorsProps = {
  errors: FieldErrors<EditPerformanceFormValues>;
};

const FieldsErrors = (props: FieldsErrorsProps) => {
  const { errors } = props;

  const displayedErrors = Object.values(errors)
    .map((err) => err?.message)
    .filter((e) => e !== undefined);

  return (
    <View style={styles.errors}>
      {!!displayedErrors.length && <FormErrors errors={displayedErrors} />}
    </View>
  );
};

const styles = StyleSheet.create({
  errors: {
    marginTop: 16,
  },
});

export default FieldsErrors;
