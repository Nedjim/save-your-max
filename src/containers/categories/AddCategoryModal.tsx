import { Text } from '@react-navigation/elements';
import { memo, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useCreateCategory } from '../../hooks/categories';
import Input from '../forms/Input';
import ModalContent from '@/src/components/ModalContent';

type AddCategoryModalProps = {
  visible: boolean;
  closeModal: () => void;
};

function AddCategoryModal(props: AddCategoryModalProps) {
  const { visible, closeModal } = props;
  const { mutate } = useCreateCategory();
  const [title, setTitle] = useState('');

  const handleCreateCategory = () => {
    if (!title.trim()) return;

    mutate(title, {
      onSuccess: () => {
        setTitle('');
      },
    });

    closeModal();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setTitle('');
        closeModal();
      }}
    >
      <ModalContent
        onClose={closeModal}
        onSubmit={title.length ? handleCreateCategory : undefined}
        submitButtonLabel="Add"
      >
        <View style={styles.spacing}>
          <Text nativeID="category-label">Name of the new category</Text>
          <Input
            value={title}
            onChange={setTitle}
            maxLength={20}
            id="category-label"
          />
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

export default memo(AddCategoryModal);
