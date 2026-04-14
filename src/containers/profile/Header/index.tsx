import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { DARK_GREY } from '@/src/constants/colors';
import { useSupabaseSession } from '@/src/hooks/auth';

function UserProfileHeader() {
  const { data: session } = useSupabaseSession();
  const email = session?.user.user_metadata.email;

  const router = useRouter();
  return (
    <View style={styles.userProfileHeader}>
      <Ionicons
        name="close"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace('/')
        }
        color={DARK_GREY}
        size={16}
        ariaHidden={true}
        style={styles.icon}
      />
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userProfileHeader: {
    display: 'flex',
    paddingVertical: 8,
  },
  icon: {
    textAlign: 'right',
  },
  email: {
    color: '#B6C2CF',
    textAlign: 'center',
  },
});

export default UserProfileHeader;
