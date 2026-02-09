import dayjs from 'dayjs';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GREY, WHITE } from '@/src/constants/colors';
import { Item } from '@/src/types';

type ItemRowProps = {
  item: Item;
};

const ItemRow = (props: ItemRowProps) => {
  const { item } = props;
  const { charge, reps } = item;

  const date = dayjs(item.date).format('DD/MM/YYYY');

  return (
    <View style={styles.itemRow}>
      <Text> {date}</Text>
      <View style={styles.details}>
        <Text>Charge: {charge} (kg)</Text>
        <Text>{reps} reps</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: WHITE,
    padding: 16,
    borderRadius: 4,
    gap: 24,
    marginBottom: 8,
  },
  details: {
    borderLeftWidth: 1,
    borderLeftColor: GREY,
    paddingLeft: 24,
  },
});

export default memo(ItemRow);
