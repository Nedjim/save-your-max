import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { WHITE } from '@/src/constants/colors';

const UserButton = () => {
  return (
    <Pressable>
      <Ionicons name="person" color={WHITE} size={18} />
    </Pressable>
  );
};

export default UserButton;
