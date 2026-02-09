import { memo, useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { BLACK, TURQUOISE, WHITE } from '../../constants/colors';
import Input from '../forms/Input';
import { useCreateItem } from '@/src/hooks/items';

type AddItemModalProps = {
  visible: boolean;
  closeModal: () => void;
  categoryId: string;
};

function AddItemModal(props: AddItemModalProps) {
  const { visible, closeModal, categoryId } = props;
  const { mutate } = useCreateItem(categoryId);

  const [charge, setCharge] = useState('0');
  const [reps, setReps] = useState('0');

  const handleCreateItem = () => {
    mutate(
      { charge: Number(charge), reps: Number(reps) },
      {
        onSuccess: () => {
          setCharge('');
          setReps('');
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
