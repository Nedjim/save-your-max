import { Modal, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useDeleteExercises } from '@/src/hooks/exercises';

type ExerciseModalProps = {
  id: string;
  refetch: () => void;
  closeModal: () => void;
};

function DeleteExerciseModal(props: ExerciseModalProps) {
  const { id, refetch, closeModal } = props;
  const { mutateAsync: deleteExerciseMutation, isPending } =
    useDeleteExercises();

  const handleDelete = async () => {
    try {
      await deleteExerciseMutation(id);
      refetch();
      closeModal();
    } catch {
      // WIP: error toast
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <ModalContent
        onClose={closeModal}
        onSubmit={handleDelete}
        submitButtonLabel="Yes"
        title="Delete"
        isPending={isPending}
      >
        <View style={styles.main}>
          <Text style={styles.text}>This exercise is about to be deleted.</Text>
          <Text style={styles.text}>Are you sure ?</Text>
        </View>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    gap: 16,
  },
  text: {
    color: WHITE,
  },
});

export default DeleteExerciseModal;
