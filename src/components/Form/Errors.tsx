import { Ionicons } from '@expo/vector-icons';
import { Control, FieldValues, useFormState } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ERROR } from '@/src/constants/colors';

/**
 * FormErrors component
 *
 * Generic component to display form errors from React Hook Form.
 *
 * @template TFieldValues
 *   The form values as entered by the user (input), matching the structure
 *   passed to useForm.
 * @template TContext
 *   Optional context for React Hook Form, usually `unknown`.
 * @template TTransformedValues
 *   The values transformed by the resolver (e.g., zodResolver),
 *   which may differ from the input values.
 *   Important for correctly typing forms when the resolver transforms data
 *   (e.g., string → number).
 *
 * @param control
 *   The Control object from useForm, typed with the three generics above.
 *   Allows FormErrors to subscribe to form errors and automatically
 *   re-render when they change.
 *
 * @example
 * <FormErrors control={control} />
 */

type FormErrorsProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
> = {
  control: Control<TFieldValues, TContext, TTransformedValues>;
};

function FormErrors<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues,
>(props: FormErrorsProps<TFieldValues, TContext, TTransformedValues>) {
  const { control } = props;
  const { errors } = useFormState({ control });

  const rootError = errors.root?.message;

  const displayedErrors = Array.from(
    new Set([
      ...Object.values(errors).map((err: any) => err.message),
      rootError,
    ]),
  ).filter((e) => e !== undefined);

  if (!displayedErrors.length) return null;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.formError}>
      {displayedErrors.map((error) => {
        return (
          <View style={styles.errorContent} key={error}>
            <Ionicons name="alert-circle" color={ERROR} size={18} />
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        );
      })}
    </Animated.View>
  );
}

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
