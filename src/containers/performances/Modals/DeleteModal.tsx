import { Modal, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useDeletePerformance } from '@/src/hooks/performances';

type DeletePerformanceModalProps = {
  id: string;
  refetch: () => void;
  closeModal: () => void;
};

function DeletePerformanceModal(props: DeletePerformanceModalProps) {
  const { id, refetch, closeModal } = props;
  const { mutateAsync: deletePerformanceMutation, isPending } =
    useDeletePerformance();

  const handleDelete = async () => {
    try {
      await deletePerformanceMutation(id);
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
          <Text style={styles.text}>
            This performance is about to be deleted.
          </Text>
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

export default DeletePerformanceModal;
