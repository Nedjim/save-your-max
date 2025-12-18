import { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { BLACK, TURQUOISE } from '../constants/colors';
import InputSection from './InputSection';

type AddItemModalProps = {
  visible: boolean;
  closeModal: () => void;
};

export default function AddItemModal(props: AddItemModalProps) {
  const { visible, closeModal } = props;
  const [name, onChangeName] = useState('');
  const [reps, onChangeReps] = useState('');
  const [charge, onChangeCharge] = useState('');
  const [date, setDate] = useState<DateType>();
  const defaultStyles = useDefaultStyles();

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
        <InputSection
          value={name}
          label="Name"
          onChange={onChangeName}
          maxLength={20}
        />
        <InputSection
          value={reps}
          label="Reps"
          onChange={onChangeReps}
          keyboardType="numeric"
        />
        <InputSection
          value={charge}
          label="Charge"
          onChange={onChangeCharge}
          keyboardType="numeric"
        />

        <DateTimePicker
          mode="single"
          date={date}
          onChange={({ date }) => setDate(date)}
          styles={defaultStyles}
        />
        <View style={styles.footer}>
          <Button
            title="Add"
            color={TURQUOISE}
            accessibilityLabel="Add a new movement"
            onPress={() => closeModal()}
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
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
});
