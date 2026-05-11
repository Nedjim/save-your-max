import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { toast } from 'sonner-native';
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
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await deletePerformanceMutation(id);
      refetch();
      closeModal();
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
          <Text style={styles.text}>{t('performance.delete_message')}</Text>
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

export default DeletePerformanceModal;
