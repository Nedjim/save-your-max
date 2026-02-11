import { useLocalSearchParams } from 'expo-router';
import { memo, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { BLACK, MODAL_OPACITY, TURQUOISE, WHITE } from '../../constants/colors';
import Input from '../forms/Input';
import DatePicker from '@/src/components/DatePicker';
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

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
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
          <View style={styles.footer}>
            <Button
              title="Add"
              color={TURQUOISE}
              accessibilityLabel="Add"
              onPress={() => {
                handleCreateItem();
              }}
            />
            <Button
              title="Close"
              color="grey"
              accessibilityLabel="close modal"
              onPress={handleClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MODAL_OPACITY,
  },
  modalContent: {
    width: 300,
    padding: 40,
    backgroundColor: WHITE,
    borderRadius: 10,
    gap: 16,
  },
  label: {
    color: BLACK,
    marginBottom: 8,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
});

export default memo(AddItemModal);
