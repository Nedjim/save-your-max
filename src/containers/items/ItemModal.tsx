import { useLocalSearchParams } from 'expo-router';
import { memo, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BLACK } from '../../constants/colors';
import Input from '../forms/Input';
import DatePicker from '@/src/components/DatePicker';
import ModalContent from '@/src/components/ModalContent';
import { useCreateItem, useUpdateItem } from '@/src/hooks/items';
import { Item, ItemModalMode } from '@/src/types';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

type ItemModalProps = {
  resetMode: () => void;
  mode: ItemModalMode;
  item: Item | null;
};

function ItemModal(props: ItemModalProps) {
  const { resetMode, mode, item } = props;
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { mutate: createItemMutation } = useCreateItem(categoryId);
  const { mutate: updateItemMutation } = useUpdateItem(categoryId);
  const nowDay = new Date();

  const [date, setDate] = useState<CalendarDate>(
    item ? new Date(item.date) : nowDay,
  );
  const [charge, setCharge] = useState(item?.charge || '0');
  const [reps, setReps] = useState(item?.reps || '0');

  const handleChangeDate = (event: { date: CalendarDate }) => {
    setDate(event.date);
  };

  const handleClose = () => {
    setCharge('');
    setReps('');
    setDate(nowDay);
    resetMode();
  };

  const createItem = () => {
    createItemMutation(
      { charge: Number(charge), reps: Number(reps), date },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  const updateItem = () => {
    if (!item) return;

    updateItemMutation(
      { charge: Number(charge), reps: Number(reps), date, id: item.id },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  const handleSubmit = () => {
    switch (mode) {
      case 'CREATE':
        createItem();
        return;
      case 'UPDATE':
        updateItem();
        return;
      default:
        return;
    }
  };

  const isSubmitAvailable = useMemo(() => {
    return Boolean(date && charge && reps);
  }, [date, charge, reps]);

  return (
    <Modal
      visible={!!mode}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        handleClose();
      }}
    >
      <ModalContent
        onClose={handleClose}
        onSubmit={isSubmitAvailable ? handleSubmit : undefined}
        submitButtonLabel={mode}
      >
        <View style={styles.spacing}>
          <View>
            <Text style={styles.label} nativeID="item-charge">
              Charge (kg)
            </Text>
            <Input
              value={String(charge)}
              onChange={setCharge}
              id="item-charge"
            />
          </View>
          <View>
            <Text style={styles.label} nativeID="item-reps">
              Reps
            </Text>
            <Input value={String(reps)} onChange={setReps} id="item-reps" />
          </View>
          <DatePicker date={date} onChange={handleChangeDate} />
        </View>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  spacing: {
    gap: 16,
  },
  label: {
    color: BLACK,
    marginBottom: 8,
  },
});

export default memo(ItemModal);
