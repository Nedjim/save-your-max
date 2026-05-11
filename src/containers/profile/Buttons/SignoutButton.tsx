import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { toast } from 'sonner-native';
import { ERROR } from '@/src/constants/colors';
import { useSignOutUser, useSupabaseSession } from '@/src/hooks/auth';

const SignOutButton = () => {
  const { mutateAsync: signOutUserMutation } = useSignOutUser();
  const { resetSession } = useSupabaseSession();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await signOutUserMutation();
      resetSession();
      router.replace('/login');
    } catch {
      toast.error(t('errors.default'));
    }
  };

  return (
    <Button
      labelStyle={{ color: ERROR }}
      accessibilityLabel={t('actions.logout')}
      onPress={handleSignOut}
      mode="text"
    >
      {t('actions.logout')}
    </Button>
  );
};

export default SignOutButton;
