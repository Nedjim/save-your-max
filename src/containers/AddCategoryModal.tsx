import { Text } from '@react-navigation/elements';
import { useState } from 'react';
import { Button, Modal, StyleSheet, View } from 'react-native';
import { BLACK, TURQUOISE, WHITE } from '../constants/colors';
import { useCreateCategory } from '../hooks/categories';
import InputSection from './InputSection';

type AddCategoryModalProps = {
  visible: boolean;
  closeModal: () => void;
};

export default function AddCategoryModal(props: AddCategoryModalProps) {
  const { visible, closeModal } = props;
  const { mutate } = useCreateCategory();
  const [title, setTitle] = useState('');

  const createCategory = () => {
    if (!title.trim()) return;

    mutate(title, {
      onSuccess: () => {
        setTitle('');
      },
    });
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
        <Text style={styles.label} nativeID="section">
          Name of the new category
        </Text>
        <InputSection
          value={title}
          onChange={setTitle}
          maxLength={20}
          id="section"
        />
        <View style={styles.footer}>
          <Button
            title="Add"
            color={TURQUOISE}
            accessibilityLabel="Add"
            onPress={() => {
              createCategory();
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
