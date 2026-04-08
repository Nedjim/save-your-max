import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import FormErrors from '@/src/components/Form/FormErrors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useUpdateUser } from '@/src/hooks/auth';
import { updatePasswordSchema } from '@/src/schemas/auth/updatePassword.schema';
import { RequestFormValues } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import UpdatePasswordFields from './Fields';
import UpdatePasswordSuccess from './Success';

type UpdatePasswordModalProps = {
  visible: boolean;
  closeModal: () => void;
};

function UpdatePasswordModal(props: UpdatePasswordModalProps) {
  const { visible, closeModal } = props;
  const { mutateAsync: updateUserMutation, isPending } = useUpdateUser();
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
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

  const displayedErrors = Object.values(errors)
    .map((err) => err.message)
    .filter((e) => e !== undefined);

  const shouldDisplayErrors = !!displayedErrors.length;

  return (
    <Modal
      visible={visible}
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
        {shouldDisplayErrors && <FormErrors errors={displayedErrors} />}
        {!shouldDisplayErrors && success ? (
          <UpdatePasswordSuccess />
        ) : (
          <UpdatePasswordFields control={control} />
        )}
      </ModalContent>
    </Modal>
  );
}

export default UpdatePasswordModal;
