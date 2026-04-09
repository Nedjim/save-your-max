import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
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
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();

  const { control, handleSubmit, setError, reset } = useForm({
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
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          type: 'server',
          message: error.message,
        });
      }
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
        submitButtonLabel="Update"
        title="Change email"
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
