import { Controller, Path, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as z from 'zod';
import FormErrors from '@/src/components/Form/Errors';
import Input, { TextContentType } from '@/src/components/Input';
import { TURQUOISE, WHITE } from '@/src/constants/colors';
import { useAuthSearchParams } from '@/src/hooks/auth';
import { confirmSchema } from '@/src/schemas/auth/confirm.schema';
import { resetPassword } from '@/src/services/supabase';
import { AuthMode } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../styles';

type ConfirmFormProps = {
  setMode: (mode: AuthMode) => void;
};

type ConfirmFormValues = z.infer<typeof confirmSchema>;

type ConfirmFormFieldType = {
  name: Path<ConfirmFormValues>;
  placeholder: string;
  textContentType: TextContentType;
};

const CONFIRM_FIELDS: ConfirmFormFieldType[] = [
  {
    name: 'password',
    placeholder: 'Password',
    textContentType: 'password',
  },
  {
    name: 'confirmedPassword',
    placeholder: 'Confirm password',
    textContentType: 'password',
  },
];

function ResetPasswordConfirmForm(props: ConfirmFormProps) {
  const { setMode } = props;
  const {
    access_token: token,
    type,
    refresh_token: refreshToken,
  } = useAuthSearchParams();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(confirmSchema),
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = async (data: ConfirmFormValues) => {
    if (!token || type !== 'recovery' || !refreshToken) {
      setError('root', {
        type: 'server',
        message: 'Invalid URL.',
      });

      return;
    }
    const { password } = data;

    try {
      await resetPassword(token, refreshToken, password);
      reset();
      setMode('resetPasswordDone');
    } catch (error: any) {
      setError('root', {
        type: 'server',
        message: error.message,
      });
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.title}>Reset password</Text>
      <FormErrors control={control} />

      <View style={styles.fields}>
        {CONFIRM_FIELDS.map((field) => {
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
                  secureTextEntry
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
          Update
        </Button>
      </View>
    </Animated.View>
  );
}

export default ResetPasswordConfirmForm;
