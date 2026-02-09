import dayjs from 'dayjs';
import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '@/src/components/IconButton';
import { GREY, LIGHT_GREY, WHITE } from '@/src/constants/colors';
import { Item } from '@/src/types';

type ItemRowProps = {
  item: Item;
  setDeleteItemId: (id: string) => void;
};

const ItemRow = (props: ItemRowProps) => {
  const { item, setDeleteItemId } = props;
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
      <View style={styles.closeButton}>
        <IconButton
          name="close"
          onPress={() => setDeleteItemId(item.id)}
          type="default"
        />
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
  closeButton: {
    backgroundColor: LIGHT_GREY,
    height: 25,
  },
});

export default memo(ItemRow);
