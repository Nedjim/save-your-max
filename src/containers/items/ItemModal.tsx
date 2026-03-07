import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Input from '../../components/Input';
import Label from '../../components/Label';
import DatePicker from '@/src/components/DatePicker';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useCategoryNameParams } from '@/src/hooks/categories';
import { useCreateItem, useUpdateItem } from '@/src/hooks/items';
import { Item } from '@/src/types';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

type ItemModalProps = {
  onClose: () => void;
  item?: Item | null;
};

export default function ItemModal(props: ItemModalProps) {
  const { item, onClose } = props;
  const { id: categoryId } = useLocalSearchParams<{ id: string }>();
  const { mutate: createItemMutation } = useCreateItem(categoryId);
  const { mutate: updateItemMutation } = useUpdateItem(categoryId);
  const categoryName = useCategoryNameParams();

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
    onClose();
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        handleClose();
      }}
    >
      <ModalContent
        onClose={handleClose}
        onSubmit={() => (item ? updateItem() : createItem())}
        submitButtonLabel={item ? 'update' : 'create'}
        title={categoryName}
      >
        <View style={styles.spacing}>
          <View>
            <Label label="Charge (kg)" nativeId="item-charge" />
            <Input
              value={String(charge)}
              onChange={setCharge}
              id="item-charge"
            />
          </View>
          <View>
            <Label label="Reps" nativeId="item-reps" />
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
});
