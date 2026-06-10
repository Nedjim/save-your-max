import Divider from '@/src/components/Divider';
import { LIGHT_GREY } from '@/src/constants/colors';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../styles';

function ConfirmFormError() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View>
      <Text style={styles.title}>{t('auth.signup_confirm_error_title')}</Text>
      <Text style={styles.description}>
        {t('auth.signup_confirm_error_description')}
      </Text>
      <View style={styles.actions}>
        <Divider />
        <Button
          buttonColor={LIGHT_GREY}
          onPress={() => router.push('/')}
          uppercase={false}
        >
          {t('actions.cancel')}
        </Button>
      </View>
    </View>
  );
}

export default ConfirmFormError;
