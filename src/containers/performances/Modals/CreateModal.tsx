import { useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import FormErrors from '../../../components/Form/Errors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useExerciseNameParams } from '@/src/hooks/exercises';
import { useCreatePerformance } from '@/src/hooks/performances';
import { editPerformanceSchema } from '@/src/schemas/performances/edit.schema';
import { EditPerformanceZodValues } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldsController from './FieldsController';

type CreatePerformanceModalProps = {
  onClose: () => void;
  refetch: () => void;
};

function CreatePerformanceModal(props: CreatePerformanceModalProps) {
  const { onClose, refetch } = props;

  const { mutateAsync: createPerformanceMutation, isPending } =
    useCreatePerformance();
  const exerciseName = useExerciseNameParams();
  const { id: exerciseId } = useLocalSearchParams<{ id: string }>();
  const nowDay = new Date();

  const { control, handleSubmit, setError, reset } = useForm({
    resolver: zodResolver(editPerformanceSchema),
    defaultValues: {
      weight: '0',
      reps: '0',
      date: nowDay,
    },
  });

  const onSubmit = async (data: EditPerformanceZodValues) => {
    try {
      const { weight, reps, date } = data;

      const payload = {
        exerciseId,
        weight: Number(weight),
        reps: Number(reps),
        date: date.toISOString(),
      };

      await createPerformanceMutation(payload);
      refetch();
      reset();
      onClose();
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
        reset();
        onClose();
      }}
    >
      <ModalContent
        onClose={() => {
          reset();
          onClose();
        }}
        onSubmit={handleSubmit(onSubmit)}
        submitButtonLabel="create"
        title={exerciseName}
        isPending={isPending}
      >
        <FieldsController control={control} />
        <FormErrors control={control} />
      </ModalContent>
    </Modal>
  );
}

export default CreatePerformanceModal;
