import { memo, ReactNode } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  DARK_GREY,
  MODAL_OPACITY,
  TURQUOISE,
  WHITE,
} from '../constants/colors';

type ModalContentProps = {
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitButtonLabel?: string;
};

const ModalContent = (props: ModalContentProps) => {
  const { children, onClose, onSubmit, submitButtonLabel = 'Ok' } = props;

  const isDisabled = !onSubmit;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {children}
        <View style={styles.modalFooter}>
          <Button
            title="Close"
            color={DARK_GREY}
            accessibilityLabel="close modal"
            onPress={onClose}
          />
          <Button
            title={submitButtonLabel}
            disabled={isDisabled}
            color={TURQUOISE}
            accessibilityLabel={submitButtonLabel}
            onPress={onSubmit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MODAL_OPACITY,
  },
  modalContent: {
    width: 300,
    padding: 24,
    backgroundColor: WHITE,
    borderRadius: 10,
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 24,
    gap: 8,
  },
});

export default memo(ModalContent);
