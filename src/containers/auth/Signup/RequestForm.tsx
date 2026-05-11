import { Controller, Path, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as z from 'zod';
import Divider from '@/src/components/Divider';
import FormErrors from '@/src/components/Form/Errors';
import Input, { TextContentType } from '@/src/components/Input';
import { LIGHT_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useSignupUser } from '@/src/hooks/auth';
import { signupSchema } from '@/src/schemas/auth/signup.schema';
import { AuthMode } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../styles';

type SignupFormProps = {
  setMode: (mode: AuthMode) => void;
};

type SignupFormValues = z.infer<typeof signupSchema>;

type SignupFormFieldType = {
  name: Path<SignupFormValues>;
  textContentType: TextContentType;
  secureTextEntry: boolean;
};

const SIGNUP_FIELDS: SignupFormFieldType[] = [
  {
    name: 'email',
    textContentType: 'emailAddress',
    secureTextEntry: false,
  },
  {
    name: 'password',
    textContentType: 'password',
    secureTextEntry: true,
  },
  {
    name: 'confirmedPassword',
    textContentType: 'password',
    secureTextEntry: true,
  },
];

function SignupRequestForm(props: SignupFormProps) {
  const { setMode } = props;
  const { mutateAsync: signupUserMutation, isPending } = useSignupUser();
  const { t } = useTranslation();

  const { control, handleSubmit, setError, reset } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const { email, password } = data;
    const payload = { email, password };

    try {
      await signupUserMutation(payload);
      reset();
      setMode('signupEmailSent');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
      }
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.title}>{t('auth.signup_title')}</Text>
      <Text style={styles.description}>{t('auth.signup_description')} </Text>
      <FormErrors control={control} />
      <View style={styles.fields}>
        {SIGNUP_FIELDS.map((field) => {
          const { name, textContentType, secureTextEntry } = field;

          return (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field: { value, onChange } }) => (
                <Input
                  id={name}
                  placeholder={t(`auth.field_${name}`)}
                  secureTextEntry={secureTextEntry}
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
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ backgroundColor: TURQUOISE }}
          labelStyle={{ color: WHITE }}
          uppercase={false}
          loading={isPending}
          disabled={isPending}
        >
          {t('actions.create')}
        </Button>
        <Divider />
        <Button
          onPress={() => setMode('signinRequest')}
          uppercase={false}
          buttonColor={LIGHT_GREY}
        >
          {t('actions.cancel')}
        </Button>
      </View>
    </Animated.View>
  );
}

export default SignupRequestForm;
