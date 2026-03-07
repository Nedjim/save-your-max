import dayjs from 'dayjs';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  DEFAULT_CONTAINER_BACKGROUND,
  GREY,
  TURQUOISE,
} from '@/src/constants/colors';
import { Item } from '@/src/types';
import ActionButton from './ActionButton';

type ItemRowProps = {
  item: Item;
  onUpdate: (item: Item) => void;
  onDelete: (item: Item) => void;
};

const ItemRow = (props: ItemRowProps) => {
  const { item, onUpdate, onDelete } = props;
  const { charge, reps } = item;

  const date = dayjs(item.date).format('DD/MM/YYYY');
  const chargeLabel = 'Charge';

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.itemRow}>
      <View style={styles.details}>
        <Text style={[styles.text, styles.date]}> {date}</Text>
        <View style={styles.charge}>
          <Text style={styles.text}>
            <Text style={styles.firstLetter}>{chargeLabel[0]}</Text>
            <Text style={styles.defaultTextColor}>{chargeLabel.slice(1)}:</Text>
          </Text>
          <Text style={styles.value}>{charge} (kg)</Text>
        </View>
        <Text style={[styles.text, styles.defaultTextColor]}>{reps} reps</Text>
      </View>
      <View style={styles.actions}>
        <ActionButton name="pencil" onPress={() => onUpdate(item)} />
        <ActionButton name="trash" onPress={() => onDelete(item)} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
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
  charge: {
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

export default ItemRow;
