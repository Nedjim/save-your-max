import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';
import { toast } from 'sonner-native';
import FormErrors from '@/src/components/Form/Errors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useUpdateUser } from '@/src/hooks/auth';
import { updateEmailSchema } from '@/src/schemas/auth/updateEmail.schema';
import { UpdatedEmailFormValues } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import UpdateEmailSent from './EmailSent';
import UpdateEmailFields from './Fields';

type UpdateEmailModalProps = {
  closeModal: () => void;
};

const UpdateEmailModal = (props: UpdateEmailModalProps) => {
  const { closeModal } = props;

  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: '',
      confirmedEmail: '',
    },
  });

  const onSubmit = async (data: UpdatedEmailFormValues) => {
    try {
      const { email } = data;
      const payload = { email };

      await updateUserMutation(payload);
      reset();
      setSuccess(true);
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
        onSubmit={!success ? handleSubmit(onSubmit) : undefined}
        isPending={isPending}
        submitButtonLabel={t('actions.update')}
        title={t('auth.reset_email_title')}
      >
        {success ? (
          <UpdateEmailSent />
        ) : (
          <UpdateEmailFields control={control} />
        )}
        <FormErrors control={control} />
      </ModalContent>
    </Modal>
  );
};

export default UpdateEmailModal;
