import { useState } from 'react';
import { Modal } from 'react-native';
import Input from '../../../components/Input';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useCreateExercise } from '@/src/hooks/exercises';

type CreateExerciseModalProps = {
  refetch: () => void;
  closeModal: () => void;
};

function CreateExerciseModal(props: CreateExerciseModalProps) {
  const { refetch, closeModal } = props;
  const { mutateAsync: createExerciseMutation, isPending } =
    useCreateExercise();

  const [title, setTitle] = useState('');

  const handleClose = () => {
    closeModal();
    setTitle('');
  };

  const handleCreateExercise = async () => {
    if (!title.trim()) return;

    try {
      await createExerciseMutation(title);
      refetch();
    } catch {
      // WIP: error toast
    }

    handleClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setTitle('');
        closeModal();
      }}
    >
      <ModalContent
        onClose={handleClose}
        onSubmit={handleCreateExercise}
        submitButtonLabel="Create"
        title="New exercise"
        isPending={isPending}
      >
        <Input
          value={title}
          onChange={setTitle}
          maxLength={20}
          id="exercise-label"
          placeholder="ex: Bench press"
        />
      </ModalContent>
    </Modal>
  );
}

export default CreateExerciseModal;
