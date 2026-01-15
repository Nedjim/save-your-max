import { useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { BLACK, TURQUOISE, WHITE } from '../constants/colors';
import { Item } from '../types';
import InputSection from './InputSection';

type AddSectionItemModalProps = {
  visible: boolean;
  selectedSection: Item;
  closeModal: () => void;
};

export default function AddSectionItemModal(props: AddSectionItemModalProps) {
  const { visible, selectedSection, closeModal } = props;
  const [reps, setReps] = useState('');
  const [charge, setCharge] = useState('');
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
        <View>
          <Text style={styles.title}>
            {selectedSection.title.toUpperCase()}
          </Text>
        </View>
        <InputView
          id="reps"
          label="Repetions"
          value={reps}
          setValue={setReps}
        />
        <InputView
          id="charges"
          label="Charges"
          value={charge}
          setValue={setCharge}
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

type InputViewProps = {
  id: string;
  label: string;
  value: string;
  setValue: (key: string) => void;
};

const InputView = (props: InputViewProps) => {
  const { id, label, value, setValue } = props;

  return (
    <View>
      <Text style={styles.label} nativeID={id}>
        {label}
      </Text>
      <InputSection
        id="name"
        value={value}
        onChange={setValue}
        maxLength={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLACK,
    padding: 16,
  },
  title: {
    color: WHITE,
    fontSize: 24,
    textAlign: 'center',
    padding: 24,
  },
  label: {
    color: WHITE,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
});
