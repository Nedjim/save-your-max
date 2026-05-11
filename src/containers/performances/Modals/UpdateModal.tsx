import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-native';
import { toast } from 'sonner-native';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useExerciseNameParams } from '@/src/hooks/exercises';
import { useUpdatePerformance } from '@/src/hooks/performances';
import { editPerformanceSchema } from '@/src/schemas/performances/edit.schema';
import {
  EditPerformanceZodValues,
  Performance,
  UpdatePerformanceFormErrors,
} from '@/src/types';
import { toastFormFieldError } from '@/src/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import FieldsController from './FieldsController';

type UpdatePerformanceModalProps = {
  performance: Performance;
  refetch: () => void;
  onClose: () => void;
};

function UpdatePerformanceModal(props: UpdatePerformanceModalProps) {
  const { performance, refetch, onClose } = props;
  const { mutateAsync: updatePerformanceMutation, isPending } =
    useUpdatePerformance();
  const exerciseName = useExerciseNameParams();
  const { t } = useTranslation();

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(editPerformanceSchema),
    defaultValues: {
      weight: String(performance.weight),
      reps: String(performance.reps),
      date: performance.date,
    },
  });

  const onSubmit = async (data: EditPerformanceZodValues) => {
    try {
      const { weight, reps, date } = data;

      const payload = {
        id: performance.id,
        weight: Number(weight),
        reps: Number(reps),
        date,
      };

      await updatePerformanceMutation(payload);
      toast.success(t('performance.create_success'));
      refetch();
      onClose();
    } catch {
      toast.error(t('errors.default'));
    }
  };

  const onError = (errors: UpdatePerformanceFormErrors) => {
    const firstError = Object.entries(errors)[0];

    toastFormFieldError(firstError);
    reset();
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
        onSubmit={handleSubmit(onSubmit, onError)}
        submitButtonLabel={t('actions.update')}
        title={exerciseName}
        isPending={isPending}
      >
        <FieldsController control={control} />
      </ModalContent>
    </Modal>
  );
}

export default UpdatePerformanceModal;
