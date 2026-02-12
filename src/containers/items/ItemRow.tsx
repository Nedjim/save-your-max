import dayjs from 'dayjs';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '@/src/components/IconButton';
import { GREY, LIGHT_GREY, WHITE } from '@/src/constants/colors';
import { Item, ItemModalMode } from '@/src/types';

type ItemRowProps = {
  item: Item;
  onsSetAction: (type: ItemModalMode, item: Item) => void;
};

const ItemRow = (props: ItemRowProps) => {
  const { item, onsSetAction } = props;
  const { charge, reps } = item;

  const date = dayjs(item.date).format('DD/MM/YYYY');

  return (
    <View style={styles.itemRow}>
      <View style={styles.details}>
        <Text> {date}</Text>
        <View style={styles.values}>
          <Text>Charge: {charge} (kg)</Text>
          <Text>{reps} reps</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={styles.actionButton}>
          <IconButton
            name="edit"
            onPress={() => onsSetAction('UPDATE', item)}
            type="default"
          />
        </View>
        <View style={styles.actionButton}>
          <IconButton
            name="close"
            onPress={() => onsSetAction('DELETE', item)}
            type="default"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    padding: 16,
    paddingBottom: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
  values: {
    borderLeftWidth: 1,
    borderLeftColor: GREY,
    paddingLeft: 24,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    backgroundColor: LIGHT_GREY,
    height: 25,
  },
});

export default memo(ItemRow);
