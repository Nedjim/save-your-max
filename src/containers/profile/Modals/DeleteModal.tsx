import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { toast } from 'sonner-native';
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
  const { t } = useTranslation();
  const { mutateAsync: deleteProfileMutation, isPending } = useDeleteProfile();

  const handleDelete = async () => {
    try {
      await deleteProfileMutation();
      resetSession();
    } catch {
      toast.error(t('errors.default'));
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
        submitButtonLabel={t('actions.yes')}
        title={t('actions.delete')}
        isPending={isPending}
      >
        <View style={styles.main}>
          <Text style={styles.text}>{t('auth.delete_account_description')}</Text>
          <Text style={styles.text}>{t('modal.confirm_message')}</Text>
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
