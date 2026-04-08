import { useRouter } from 'expo-router';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useDeleteProfile } from '@/src/hooks/profile';

type DeleteProfileModalProps = {
  refetch: () => void;
  closeModal: () => void;
};

function DeleteProfileModal(props: DeleteProfileModalProps) {
  const { refetch, closeModal } = props;
  const router = useRouter();

  const { mutateAsync: deleteProfileMutation, isPending } = useDeleteProfile();

  const handleDelete = async () => {
    try {
      await deleteProfileMutation();
      refetch();
      router.replace('/login');
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
          <Text style={styles.text}>Your account is about to be deleted.</Text>
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

export default DeleteProfileModal;
