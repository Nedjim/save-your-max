import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Input from '../../../components/Input';
import Label from '../../../components/Label';
import DatePicker from '@/src/components/DatePicker';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useExerciseNameParams } from '@/src/hooks/exercises';
import { useCreatePerformance } from '@/src/hooks/performances';

type CreatePerformanceModalProps = {
  onClose: () => void;
  refetch: () => void;
};

function CreatePerformanceModal(props: CreatePerformanceModalProps) {
  const { onClose, refetch } = props;
  const { mutateAsync: createPerformanceMutation, isPending } =
    useCreatePerformance();
  const { id: exerciseId } = useLocalSearchParams<{ id: string }>();
  const exerciseName = useExerciseNameParams();

  const nowDay = new Date();

  const [date, setDate] = useState<Date>(nowDay);
  const [weight, setWeight] = useState<string>('0');
  const [reps, setReps] = useState<string>('0');

  const handleChangeDate = (date: Date) => {
    setDate(date);
  };

  const resetValues = () => {
    setWeight('0');
    setReps('0');
    setDate(nowDay);
  };

  const createPerformance = async () => {
    try {
      const payload = {
        exerciseId,
        weight: Number(weight),
        reps: Number(reps),
        date: date.toISOString(),
      };

      await createPerformanceMutation(payload);
      refetch();
      resetValues();
      onClose();
    } catch {
      // WIP: error toast
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        resetValues();
        onClose();
      }}
    >
      <ModalContent
        onClose={() => {
          resetValues();
          onClose();
        }}
        onSubmit={createPerformance}
        submitButtonLabel="create"
        title={exerciseName}
        isPending={isPending}
      >
        <View style={styles.spacing}>
          <View>
            <Label label="Weight (kg)" nativeId="performance-weight" />
            <Input
              value={String(weight)}
              onChange={setWeight}
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

export default CreatePerformanceModal;
