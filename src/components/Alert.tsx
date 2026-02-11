import { memo } from 'react';
import { Modal, Text, View } from 'react-native';
import ModalContent from './ModalContent';

type AlertProps = {
  visible: boolean;
  description: string;
  onClose: () => void;
  onSubmit: () => void;
};

const Alert = (props: AlertProps) => {
  const { visible, description, onClose, onSubmit } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalContent onClose={onClose} onSubmit={onSubmit}>
        <View>
          <Text>{description}</Text>
          <Text>Are you sure ?</Text>
        </View>
      </ModalContent>
    </Modal>
  );
};

export default memo(Alert);
