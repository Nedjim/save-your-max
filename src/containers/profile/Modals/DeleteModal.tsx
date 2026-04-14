import { Modal, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '@/src/constants/colors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useSupabaseSession } from '@/src/hooks/auth';
import { useDeleteProfile } from '@/src/hooks/profile';

type DeleteProfileModalProps = {
  closeModal: () => void;
};

function DeleteProfileModal(props: DeleteProfileModalProps) {
  const { closeModal } = props;
  const { resetSession } = useSupabaseSession();

  const { mutateAsync: deleteProfileMutation, isPending } = useDeleteProfile();

  const handleDelete = async () => {
    try {
      await deleteProfileMutation();
      resetSession();
    } catch (error) {
      // WIP: error toast
      console.error(error);
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
