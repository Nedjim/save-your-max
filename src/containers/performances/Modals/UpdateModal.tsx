import { useForm } from 'react-hook-form';
import { Modal } from 'react-native';
import FormErrors from '../../../components/Form/Errors';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useExerciseNameParams } from '@/src/hooks/exercises';
import { useUpdatePerformance } from '@/src/hooks/performances';
import { editPerformanceSchema } from '@/src/schemas/performances/edit.schema';
import { EditPerformanceZodValues, Performance } from '@/src/types';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldsController from './FieldsController';

type UpdatePerformanceModalProps = {
  onClose: () => void;
  performance: Performance;
  refetch: () => void;
};

function UpdatePerformanceModal(props: UpdatePerformanceModalProps) {
  const { performance, refetch, onClose } = props;
  const { mutateAsync: updatePerformanceMutation, isPending } =
    useUpdatePerformance();
  const exerciseName = useExerciseNameParams();

  const { control, handleSubmit, setError, reset } = useForm({
    resolver: zodResolver(editPerformanceSchema),
    defaultValues: {
      weight: String(performance.weight),
      reps: String(performance.reps),
      date: new Date(performance.date),
    },
  });

  const onSubmit = async (data: EditPerformanceZodValues) => {
    try {
      const { weight, reps, date } = data;

      const payload = {
        weight: Number(weight),
        reps: Number(reps),
        date: date.toISOString(),
        id: performance.id,
      };

      await updatePerformanceMutation(payload);
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
        onClose();
      }}
    >
      <ModalContent
        onClose={() => {
          reset();
          onClose();
        }}
        onSubmit={handleSubmit(onSubmit)}
        submitButtonLabel="update"
        title={exerciseName}
        isPending={isPending}
      >
        <FieldsController control={control} />
        <FormErrors control={control} />
      </ModalContent>
    </Modal>
  );
}

export default UpdatePerformanceModal;
