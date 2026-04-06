import { Controller, Path, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as z from 'zod';
import Divider from '@/src/components/Divider';
import FormErrors from '@/src/components/Form/FormErrors';
import Input, { TextContentType } from '@/src/components/Input';
import { LIGHT_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { requestSchema } from '@/src/schemas/auth/request.schema';
import { resetPasswordEmail } from '@/src/services/supabase';
import { AuthMode } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../styles';

type RequestFormProps = {
  setMode: (mode: AuthMode) => void;
};

type RequestFormValues = z.infer<typeof requestSchema>;

type RequestFormFieldType = {
  name: Path<RequestFormValues>;
  placeholder: string;
  textContentType: TextContentType;
};

const REQUEST_FIELDS: RequestFormFieldType[] = [
  {
    name: 'email',
    placeholder: 'E-mail',
    textContentType: 'emailAddress',
  },
];

function ResetPasswordRequestForm(props: RequestFormProps) {
  const { setMode } = props;

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RequestFormValues) => {
    const { email } = data;

    try {
      await resetPasswordEmail(email);
      reset();
      setMode('resetPasswordEmailSent');
    } catch {
      setError('root', {
        type: 'server',
        message: 'Reset password error.',
      });
    }
  };

  const displayedErrors = Object.values(errors)
    .map((err) => err.message)
    .filter((e) => e !== undefined);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>
        Enter your email to receive a link to change your password.
      </Text>

      {!!displayedErrors.length && <FormErrors errors={displayedErrors} />}

      <View style={styles.fields}>
        {REQUEST_FIELDS.map((field) => {
          const { name, placeholder, textContentType } = field;

          return (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field: { value, onChange } }) => (
                <Input
                  id={name}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  textContentType={textContentType}
                />
              )}
            />
          );
        })}
      </View>

      <View style={styles.actions}>
        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ backgroundColor: TURQUOISE }}
          labelStyle={{ color: WHITE }}
          uppercase={false}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Apply
        </Button>
        <Divider />
        <Button
          buttonColor={LIGHT_GREY}
          onPress={() => setMode('signinRequest')}
          uppercase={false}
        >
          Cancel
        </Button>
      </View>
    </Animated.View>
  );
}

export default ResetPasswordRequestForm;
