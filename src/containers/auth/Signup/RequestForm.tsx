import { Controller, Path, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as z from 'zod';
import Divider from '@/src/components/Divider';
import FormErrors from '@/src/components/Form/FormErrors';
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
  placeholder: string;
  textContentType: TextContentType;
  secureTextEntry: boolean;
};

const SIGNUP_FIELDS: SignupFormFieldType[] = [
  {
    name: 'email',
    placeholder: 'E-mail',
    textContentType: 'emailAddress',
    secureTextEntry: false,
  },
  {
    name: 'password',
    placeholder: 'Password',
    textContentType: 'password',
    secureTextEntry: true,
  },
  {
    name: 'confirmedPassword',
    placeholder: 'Confirm password',
    textContentType: 'password',
    secureTextEntry: true,
  },
];

function SignupRequestForm(props: SignupFormProps) {
  const { setMode } = props;
  const { mutate: signupUserMutation, isPending } = useSignupUser();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    const { email, password } = data;
    const payload = { email, password };

    signupUserMutation(payload, {
      onSuccess: () => {
        reset();
        setMode('signupEmailSent');
      },
      onError: (error) => {
        setError('root', {
          type: 'server',
          message: error.message,
        });
      },
    });
  };

  const displayedErrors = Object.values(errors)
    .map((err) => err?.message)
    .filter((e) => e !== undefined);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Enter your email and password to create your account.
      </Text>

      {!!displayedErrors.length && <FormErrors errors={displayedErrors} />}

      <View style={styles.fields}>
        {SIGNUP_FIELDS.map((field) => {
          const { name, placeholder, textContentType, secureTextEntry } = field;

          return (
            <Controller
              key={name}
              control={control}
              name={name}
              render={({ field: { value, onChange } }) => (
                <Input
                  id={name}
                  placeholder={placeholder}
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
          Create
        </Button>
        <Divider />
        <Button
          onPress={() => setMode('signinRequest')}
          uppercase={false}
          buttonColor={LIGHT_GREY}
        >
          Sign in
        </Button>
      </View>
    </Animated.View>
  );
}

export default SignupRequestForm;
