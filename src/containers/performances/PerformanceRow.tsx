import dayjs from 'dayjs';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import EditListButton from '../../components/Buttons/EditListButton';
import {
  DEFAULT_CONTAINER_BACKGROUND,
  GREY,
  TURQUOISE,
} from '@/src/constants/colors';
import { Performance } from '@/src/types';

type PerformanceRowProps = {
  performance: Performance;
  onUpdate: (performance: Performance) => void;
  onDelete: (id: string) => void;
};

const PerformanceRow = (props: PerformanceRowProps) => {
  const { performance, onUpdate, onDelete } = props;
  const { weight, reps } = performance;

  const date = dayjs(performance.date).format('DD/MM/YYYY');
  const weightLabel = 'Weight';

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.performanceRow}
    >
      <View style={styles.details}>
        <Text style={[styles.text, styles.date]}> {date}</Text>
        <View style={styles.weight}>
          <Text style={styles.text}>
            <Text style={styles.firstLetter}>{weightLabel[0]}</Text>
            <Text style={styles.defaultTextColor}>{weightLabel.slice(1)}:</Text>
          </Text>
          <Text style={styles.value}>{weight} (kg)</Text>
        </View>
        <Text style={[styles.text, styles.defaultTextColor]}>{reps} reps</Text>
      </View>
      <View style={styles.actions}>
        <EditListButton name="pencil" onPress={() => onUpdate(performance)} />
        <EditListButton name="trash" onPress={() => onDelete(performance.id)} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  performanceRow: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
  },
  weight: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  value: {
    color: TURQUOISE,
  },
  defaultTextColor: {
    color: '#86a7a7',
  },
  firstLetter: {
    color: TURQUOISE,
  },
  text: {
    color: GREY,
  },
  details: {
    display: 'flex',
    gap: 12,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});

export default PerformanceRow;
