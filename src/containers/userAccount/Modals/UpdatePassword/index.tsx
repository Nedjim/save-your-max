import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import FormErrors from '@/src/components/Form/Errors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useUpdateUser } from '@/src/hooks/auth';
import { updatePasswordSchema } from '@/src/schemas/auth/updatePassword.schema';
import { RequestFormValues } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import UpdatePasswordFields from './Fields';
import UpdatePasswordSuccess from './Success';

type UpdatePasswordModalProps = {
  closeModal: () => void;
};

function UpdatePasswordModal(props: UpdatePasswordModalProps) {
  const { closeModal } = props;
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, setError, reset } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = async (data: RequestFormValues) => {
    const { password } = data;
    const payload = { password };

    try {
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
        title={!success ? 'Change password' : ''}
      >
        {success ? (
          <UpdatePasswordSuccess />
        ) : (
          <UpdatePasswordFields control={control} />
        )}
        <FormErrors control={control} />
      </ModalContent>
    </Modal>
  );
}

export default UpdatePasswordModal;
