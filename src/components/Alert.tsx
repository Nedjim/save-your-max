import { memo } from 'react';
import {
  Button,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { WHITE } from '../constants/colors';

type AlertProps = {
  visible: boolean;
  description: string;
  onClose: () => void;
  onSubmit: () => void;
};

const Alert = (props: AlertProps) => {
  const { visible, description, onClose, onSubmit } = props;

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <Pressable
          style={[
            Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop,
            styles.backdrop,
          ]}
          onPress={onClose}
        />
        <View style={styles.content}>
          <Text>{description}</Text>
          <Text>Are you sure ?</Text>

          <View style={styles.actions}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Ok" onPress={onSubmit} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.32,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: WHITE,
    margin: 'auto',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
    justifyContent: 'center',
  },
});

export default memo(Alert);
