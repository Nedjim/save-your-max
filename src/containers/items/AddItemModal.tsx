import { useLocalSearchParams } from 'expo-router';
import { memo, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { BLACK, TURQUOISE, WHITE } from '../../constants/colors';
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

  const handleCreateItem = () => {
    mutate(
      { charge: Number(charge), reps: Number(reps), date },
      {
        onSuccess: () => {
          setCharge('');
          setReps('');
          setDate(nowDay);
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
      <View style={styles.container}>
        <Text style={styles.label} nativeID="item-charge">
          Charge (kg)
        </Text>
        <Input value={charge} onChange={setCharge} id="item-charge" />
        <Text style={styles.label} nativeID="item-reps">
          Reps
        </Text>
        <Input value={reps} onChange={setReps} id="item-reps" />
        <DatePicker date={date} onChange={handleChangeDate} />
        <View style={styles.footer}>
          <Button
            title="Add"
            color={TURQUOISE}
            accessibilityLabel="Add"
            onPress={() => {
              handleCreateItem();
              closeModal();
            }}
          />
          <Button
            title="Close"
            color="grey"
            accessibilityLabel="close modal"
            onPress={() => closeModal()}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK,
    padding: 16,
  },
  label: {
    color: WHITE,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
});

export default memo(AddItemModal);
