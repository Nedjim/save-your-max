import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as z from 'zod';
import Divider from '@/src/components/Divider';
import FormErrors from '@/src/components/Form/Errors';
import Input from '@/src/components/Input';
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

function ResetPasswordRequestForm(props: RequestFormProps) {
  const { setMode } = props;
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm({
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
        message: t('errors.default'),
      });
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.title}>{t('auth.reset_password_title')}</Text>
      <Text style={styles.description}>
        {t('auth.reset_password_description')}
      </Text>

      <FormErrors control={control} />

      <View style={styles.fields}>
        <Controller
          key="email"
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input
              id="email"
              placeholder={t('auth.field_email')}
              value={value}
              onChange={onChange}
              textContentType="emailAddress"
            />
          )}
        />
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
          {t('actions.send')}
        </Button>
        <Divider />
        <Button
          buttonColor={LIGHT_GREY}
          onPress={() => setMode('signinRequest')}
          uppercase={false}
        >
          {t('actions.cancel')}
        </Button>
      </View>
    </Animated.View>
  );
}

export default ResetPasswordRequestForm;
