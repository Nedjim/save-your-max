import { Modal, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../constants/colors';
import ModalContent from '../containers/modal/ModalContent';

type AlertProps = {
  description: string;
  onClose: () => void;
  onSubmit: () => void;
};

const Alert = (props: AlertProps) => {
  const { description, onClose, onSubmit } = props;

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
      <ModalContent
        onClose={onClose}
        onSubmit={onSubmit}
        submitButtonLabel="Yes"
      >
        <View style={styles.main}>
          <Text style={styles.text}>{description}</Text>
          <Text style={styles.text}>Are you sure ?</Text>
        </View>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    gap: 16,
  },
  text: {
    color: WHITE,
  },
});
export default Alert;
