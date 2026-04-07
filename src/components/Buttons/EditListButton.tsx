import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { GREY } from '@/src/constants/colors';

type ActionsButtonProps = {
  name: 'trash' | 'pencil';
  onPress: () => void;
};

const EditListButton = (props: ActionsButtonProps) => {
  const { name, onPress } = props;

  return (
    <View style={styles.editListButton}>
      <Pressable onPress={onPress}>
        <Ionicons name={name} color={GREY} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  editListButton: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 224, 224, 0.26)',
    borderRadius: 5,
    padding: 8,
    height: 30,
  },
  button: {
    padding: 6,
    borderRadius: 40,
    elevation: 2,
  },
});

export default EditListButton;
