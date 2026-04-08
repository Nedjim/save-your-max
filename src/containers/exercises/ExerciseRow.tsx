import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  DEFAULT_CONTAINER_BACKGROUND,
  LIGHT_GREY,
} from '../../constants/colors';

type ExerciseRowProps = {
  title: string;
  id: string;
  onDelete: () => void;
  onPress?: () => void;
};

function ExerciseRow(props: ExerciseRowProps) {
  const { title, onPress, onDelete } = props;

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity onPress={onPress} style={styles.exerciseRow}>
        <Ionicons name="chevron-forward" color={LIGHT_GREY} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.options}>
          <Pressable
            onPress={(e) => {
              e.preventDefault();
              onDelete();
            }}
          >
            <Ionicons name="close" color={LIGHT_GREY} />
          </Pressable>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  exerciseRow: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    color: LIGHT_GREY,
  },
  title: {
    fontSize: 16,
    color: LIGHT_GREY,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
});

export default ExerciseRow;
