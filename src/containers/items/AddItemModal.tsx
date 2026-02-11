import { useLocalSearchParams } from 'expo-router';
import { memo, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { BLACK } from '../../constants/colors';
import Input from '../forms/Input';
import DatePicker from '@/src/components/DatePicker';
import ModalContent from '@/src/components/ModalContent';
import { useCreateItem } from '@/src/hooks/items';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

type AddItemModalProps = {
  visible: boolean;
  closeModal: () => void;
};

function AddItemModal(props: AddItemModalProps) {
  const { visible, closeModal } = props;
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { mutate } = useCreateItem(categoryId);
  const nowDay = new Date();

  const [date, setDate] = useState<CalendarDate>(nowDay);
  const [charge, setCharge] = useState('0');
  const [reps, setReps] = useState('0');

  const handleChangeDate = (event: { date: CalendarDate }) => {
    setDate(event.date);
  };

  const handleClose = () => {
    setCharge('');
    setReps('');
    setDate(nowDay);
    closeModal();
  };

  const handleCreateItem = () => {
    mutate(
      { charge: Number(charge), reps: Number(reps), date },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  const isSubmitAvailable = useMemo(() => {
    return Boolean(date && charge.length && reps.length);
  }, [date, charge, reps]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <ModalContent
        onClose={handleClose}
        onSubmit={isSubmitAvailable ? handleCreateItem : undefined}
        submitButtonLabel="Add"
      >
        <View style={styles.spacing}>
          <View>
            <Text style={styles.label} nativeID="item-charge">
              Charge (kg)
            </Text>
            <Input value={charge} onChange={setCharge} id="item-charge" />
          </View>
          <View>
            <Text style={styles.label} nativeID="item-reps">
              Reps
            </Text>
            <Input value={reps} onChange={setReps} id="item-reps" />
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

export default memo(AddItemModal);
