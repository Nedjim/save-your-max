import { StyleSheet, View } from 'react-native';
import DeleteUserProfileButton from './Buttons/DeleteUserProfileButton';
import SignoutButton from './Buttons/SignoutButton';
import { DEFAULT_CONTAINER_BACKGROUND } from '@/src/constants/colors';
import UserProfileHeader from './Header';
import UserProfileInformations from './Informations.tsx';

const UserProfile = () => {
  return (
    <View style={styles.userProfile}>
      <UserProfileHeader />
      <UserProfileInformations />
      <View style={styles.actions}>
        <SignoutButton />
        <DeleteUserProfileButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userProfile: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 16,
    borderRadius: 8,
  },
  actions: {
    display: 'flex',
  },
});

export default UserProfile;
