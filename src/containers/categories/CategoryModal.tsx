import { useState } from 'react';
import { Modal } from 'react-native';
import Input from '../../components/Input';
import { useCreateCategory } from '../../hooks/categories';
import ModalContent from '@/src/containers/modal/ModalContent';

type CategoryModalProps = {
  visible: boolean;
  closeModal: () => void;
};

export default function CategoryModal(props: CategoryModalProps) {
  const { visible, closeModal } = props;
  const { mutate } = useCreateCategory();
  const [title, setTitle] = useState('');

  const handleClose = () => {
    closeModal();
    setTitle('');
  };

  const handleCreateCategory = () => {
    if (!title.trim()) return;

    mutate(title, {
      onSuccess: () => {
        // WIP: push toast
      },
    });

    handleClose();
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
        onClose={handleClose}
        onSubmit={title.length ? handleCreateCategory : undefined}
        submitButtonLabel="Create"
        title="New category"
      >
        <Input
          value={title}
          onChange={setTitle}
          maxLength={20}
          id="category-label"
          placeholder="ex: Bench press"
        />
      </ModalContent>
    </Modal>
  );
}
