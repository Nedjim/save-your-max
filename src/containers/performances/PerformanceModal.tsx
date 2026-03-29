import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Input from '../../components/Input';
import Label from '../../components/Label';
import DatePicker from '@/src/components/DatePicker';
import ModalContent from '@/src/containers/modal/ModalContent';
import { useExerciseNameParams } from '@/src/hooks/exercises';
import {
  useCreatePerformance,
  useUpdatePerformance,
} from '@/src/hooks/performances';
import { Performance } from '@/src/types';

type PerformanceModalProps = {
  onClose: () => void;
  performance?: Performance | null;
};

function PerformanceModal(props: PerformanceModalProps) {
  const { performance, onClose } = props;
  const { id: exerciseId } = useLocalSearchParams<{ id: string }>();
  const { mutate: createPerformanceMutation } =
    useCreatePerformance(exerciseId);
  const { mutate: updatePerformanceMutation } =
    useUpdatePerformance(exerciseId);
  const exerciseName = useExerciseNameParams();

  const nowDay = new Date();

  const [date, setDate] = useState<Date>(
    performance ? new Date(performance.date) : nowDay,
  );
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

  const createPerformance = () => {
    createPerformanceMutation(
      {
        weight: Number(weight),
        reps: Number(reps),
        date: date.toISOString(),
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
  };

  const updatePerformance = () => {
    if (!performance) return;

    updatePerformanceMutation(
      {
        weight: Number(weight),
        reps: Number(reps),
        date: date.toISOString(),
        id: performance.id,
      },
      {
        onSuccess: () => {
          handleClose();
        },
      },
    );
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
        onSubmit={() =>
          performance ? updatePerformance() : createPerformance()
        }
        submitButtonLabel={performance ? 'update' : 'create'}
        title={exerciseName}
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

export default PerformanceModal;
