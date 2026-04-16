import { Controller, useForm } from 'react-hook-form';
import { Modal, StyleSheet, View } from 'react-native';
import { toast } from 'sonner-native';
import * as z from 'zod';
import Input from '../../../components/Input';
import FormErrors from '@/src/components/Form/Errors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useCreateExercise } from '@/src/hooks/exercises';
import { createExerciseSchema } from '@/src/schemas/exercises/create.schema';
import { ApiError } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';

type CreateExerciseModalProps = {
  refetch: () => void;
  closeModal: () => void;
};

type CreateExerciseFormValues = z.infer<typeof createExerciseSchema>;

function CreateExerciseModal(props: CreateExerciseModalProps) {
  const { refetch, closeModal } = props;
  const { mutateAsync: createExerciseMutation, isPending } =
    useCreateExercise();

  const { control, handleSubmit, setError, reset } = useForm({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: '',
    },
  });

  const handleClose = () => {
    reset();
    closeModal();
  };

  const onSubmit = async (data: CreateExerciseFormValues) => {
    try {
      await createExerciseMutation(data.name);
      refetch();
      toast.success(`Exercise "${data.name}" was created successfully 🎉`);

      handleClose();
    } catch (error) {
      const errorData = error as ApiError;
      setError('root', {
        type: 'server',
        message: errorData.message,
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        reset();
        closeModal();
      }}
    >
      <ModalContent
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        submitButtonLabel="Create"
        title="New exercise"
        isPending={isPending}
      >
        <Controller
          key="exercise-name-controller"
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              id="exercise-name"
              placeholder="Bench press"
              value={value}
              onChange={onChange}
              textContentType="none"
            />
          )}
        />
        <View style={styles.errors}>
          <FormErrors control={control} />
        </View>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  errors: {
    marginTop: 16,
  },
});

export default CreateExerciseModal;
