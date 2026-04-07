import { useRouter } from 'expo-router';
import { Controller, Path, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as z from 'zod';
import Divider from '@/src/components/Divider';
import { default as FormErrors } from '@/src/components/Form/FormErrors';
import Input, { TextContentType } from '@/src/components/Input';
import { LIGHT_GREY, TURQUOISE, WHITE } from '@/src/constants/colors';
import { useSignInUser } from '@/src/hooks/auth';
import { signinSchema } from '@/src/schemas/auth/signin.schema';
import { AuthMode } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from '../styles';

type SigninFormProps = {
  setMode: (mode: AuthMode) => void;
};

type SigninFormValues = z.infer<typeof signinSchema>;

type SigninFormFieldType = {
  name: Path<SigninFormValues>;
  placeholder: string;
  textContentType: TextContentType;
  secureTextEntry: boolean;
};

const SIGNIN_FIELDS: SigninFormFieldType[] = [
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
];

const SigninForm = (props: SigninFormProps) => {
  const { setMode } = props;

  const router = useRouter();
  const { mutateAsync, isPending } = useSignInUser();
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    try {
      await mutateAsync(data);
      reset();
      router.replace('/exercises');
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
      }
    }
  };

  const rootError = errors.root?.message;

  const displayedErrors = Array.from(
    new Set([...Object.values(errors).map((err) => err.message), rootError]),
  ).filter((e) => e !== undefined);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Enter your email and password.</Text>

      {!!displayedErrors.length && <FormErrors errors={displayedErrors} />}

      <View style={styles.fields}>
        {SIGNIN_FIELDS.map((field) => {
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
                  value={value}
                  onChange={onChange}
                  secureTextEntry={secureTextEntry}
                  textContentType={textContentType}
                />
              )}
            />
          );
        })}
      </View>

      <Button uppercase={false} onPress={() => setMode('resetPasswordRequest')}>
        Forgot passeword ?
      </Button>

      <View style={styles.actions}>
        <Button
          onPress={handleSubmit(onSubmit)}
          style={{ backgroundColor: TURQUOISE }}
          labelStyle={{ color: WHITE }}
          uppercase={false}
          loading={isPending}
          disabled={isPending}
        >
          Sign in
        </Button>
        <Divider />
        <Button
          buttonColor={LIGHT_GREY}
          onPress={() => setMode('signupRequest')}
          uppercase={false}
        >
          Create an account
        </Button>
      </View>
    </Animated.View>
  );
};

export default SigninForm;
