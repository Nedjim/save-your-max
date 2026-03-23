import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { WHITE } from '@/src/constants/colors';

function HomeButton() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/')}>
      <Ionicons name="home" color={WHITE} size={18} />
    </Pressable>
  );
}

export default HomeButton;
