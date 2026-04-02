import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { ERROR } from '@/src/constants/colors';

type FormErrorType = { errors: string[] };

const FormErrors = (props: FormErrorType) => {
  const { errors } = props;

  return (
    <View style={styles.formError}>
      {errors.map((error, id) => {
        return (
          <View style={styles.errorContent} key={id}>
            <Ionicons name="alert-circle" color={ERROR} size={18} />
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  formError: {
    display: 'flex',
  },
  errorContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  errorMessage: {
    color: ERROR,
  },
});
export default FormErrors;
