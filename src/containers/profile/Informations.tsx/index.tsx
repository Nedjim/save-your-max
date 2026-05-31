import Error from '@/src/components/Error';
import Loader from '@/src/components/Loader';
import { WHITE } from '@/src/constants/colors';
import { useProfile } from '@/src/hooks/profile';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ProfileDetails from './ProfileDetails';

function UserProfileInformations() {
  const { data: profile, isLoading, isError, error, refetch } = useProfile();
  const { t } = useTranslation();

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !profile) {
    content = <View>{t('errors.default')}</View>;
  }

  if (profile) {
    content = <ProfileDetails profile={profile} refetch={refetch} />;
  }

  return <View style={styles.informations}>{content}</View>;
}

const styles = StyleSheet.create({
  informations: {
    display: 'flex',
    marginVertical: 8,
    padding: 8,
    gap: 16,
    borderRadius: 8,
    color: WHITE,
    backgroundColor: 'rgba(28, 35, 44, 0.85)',
  },
});

export default UserProfileInformations;
