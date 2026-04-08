import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import DatePicker from '@/src/components/DatePicker';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useExerciseNameParams } from '@/src/hooks/exercises';
import { useUpdatePerformance } from '@/src/hooks/performances';
import { Performance } from '@/src/types';

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

  const nowDay = new Date();

  const [date, setDate] = useState<Date>(new Date(performance.date));
  const [weight, setWeight] = useState(performance?.weight || '0');
  const [reps, setReps] = useState(performance?.reps || '0');

  const handleChangeDate = (date: Date) => {
    setDate(date);
  };

  const handleClose = () => {
    setWeight('');
    setReps('');
    setDate(nowDay);
    onClose();
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        weight: Number(weight),
        reps: Number(reps),
        date: date.toISOString(),
        id: performance.id,
      };

      await updatePerformanceMutation(payload);
      refetch();
      handleClose();
    } catch {
      // WIP: error toast
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        handleClose();
      }}
    >
      <ModalContent
        onClose={handleClose}
        onSubmit={handleUpdate}
        submitButtonLabel="update"
        title={exerciseName}
        isPending={isPending}
      >
        <View style={styles.spacing}>
          <View>
            <Label label="Weight (kg)" nativeId="performance-weight" />
            <Input
              value={String(weight)}
              onChange={(value: string) => setWeight(value)}
              id="performance-weight"
            />
          </View>
          <View>
            <Label label="Reps" nativeId="performance-reps" />
            <Input
              value={String(reps)}
              onChange={setReps}
              id="performance-reps"
            />
          </View>
          <DatePicker date={date} onChange={handleChangeDate} />
        </View>
      </ModalContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  spacing: {
    gap: 16,
  },
});

export default UpdatePerformanceModal;
