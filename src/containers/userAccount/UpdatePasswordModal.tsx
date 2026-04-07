import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, Path, useForm } from 'react-hook-form';
import { Modal, StyleSheet, Text, View } from 'react-native';
import * as z from 'zod';
import Input from '../../components/Input';
import FormErrors from '@/src/components/Form/FormErrors';
import { TURQUOISE, WHITE } from '@/src/constants/colors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useUpdateUser } from '@/src/hooks/auth';
import { updatePasswordSchema } from '@/src/schemas/auth/updatePassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';

type UpdatePasswordModalProps = {
  visible: boolean;
  closeModal: () => void;
};

type RequestFormValues = z.infer<typeof updatePasswordSchema>;

type UpdatePasswordFieldType = {
  name: Path<RequestFormValues>;
  placeholder: string;
  textContentType: 'password';
};

const UPDATE_PASSWORD_FIELDS: UpdatePasswordFieldType[] = [
  {
    name: 'password',
    placeholder: 'New password',
    textContentType: 'password',
  },
  {
    name: 'confirmedPassword',
    placeholder: 'Confirmed password',
    textContentType: 'password',
  },
];

function UpdatePasswordModal(props: UpdatePasswordModalProps) {
  const { visible, closeModal } = props;
  const { mutate: updateUserMutation, isPending } = useUpdateUser();
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmedPassword: '',
    },
  });

  const onSubmit = (data: RequestFormValues) => {
    const { password } = data;
    const payload = { password };

    updateUserMutation(payload, {
      onSuccess: () => {
        reset();
        setSuccess(true);
      },
      onError: (error) => {
        setError('root', {
          type: 'server',
          message: error.message,
        });
      },
    });
  };

  const handleClose = () => {
    closeModal();
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
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isPending}
        submitButtonLabel="Update"
        title="Change password"
      >
        {shouldDisplayErrors && <FormErrors errors={displayedErrors} />}
        {!shouldDisplayErrors && success && (
          <View style={styles.success}>
            <Ionicons
              name="checkmark-circle"
              color={TURQUOISE}
              size={32}
              ariaHidden={true}
            />
            <Text style={styles.successMessage}>
              Password successfuly updated!
            </Text>
          </View>
        )}
        <View style={styles.fields}>
          {UPDATE_PASSWORD_FIELDS.map((field) => {
            const { name, placeholder, textContentType } = field;

            return (
              <Controller
                key={name}
                control={control}
                name={name}
                render={({ field: { value, onChange } }) => (
                  <Input
                    id={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    textContentType={textContentType}
                    secureTextEntry={true}
                  />
                )}
              />
            );
          })}
        </View>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  success: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  successMessage: {
    color: WHITE,
  },
  fields: {
    gap: 16,
    marginVertical: 16,
  },
});

export default UpdatePasswordModal;
