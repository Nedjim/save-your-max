import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Error from '@/src/components/Error';
import { WHITE } from '@/src/constants/colors';
import { useProfile } from '@/src/hooks/profile';
import ProfileDetails from './ProfileDetails';

function UserProfileInformations() {
  const { data: profile, isLoading, isError, error, refetch } = useProfile();

  let content = null;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={WHITE} />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !profile) {
    content = <View>Empty state</View>;
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
    padding: 16,
    gap: 16,
    borderRadius: 8,
    color: WHITE,
    backgroundColor: 'rgba(28, 35, 44, 0.85)',
  },
});

export default UserProfileInformations;
