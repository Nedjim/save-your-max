import { useState } from 'react';
import { Modal } from 'react-native';
import Input from '../../components/Input';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useCreateExercise } from '@/src/hooks/exercises';

type ExerciseModalProps = {
  visible: boolean;
  closeModal: () => void;
};

export default function ExerciseModal(props: ExerciseModalProps) {
  const { visible, closeModal } = props;
  const { mutate: createExerciseMutation } = useCreateExercise();
  const [title, setTitle] = useState('');

  const handleClose = () => {
    closeModal();
    setTitle('');
  };

  const handleCreateExercise = () => {
    if (!title.trim()) return;

    createExerciseMutation(title, {
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
        onSubmit={title.length ? handleCreateExercise : undefined}
        submitButtonLabel="Create"
        title="New exercise"
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
