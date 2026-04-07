import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  DARK_GREY,
  MODAL_OPACITY,
  TURQUOISE,
  WHITE,
} from '../../constants/colors';

type ModalContentProps = {
  children: ReactNode;
  title?: string;
  onClose: () => void;
  submitButtonLabel?: string;
  onSubmit?: () => void;
  isPending?: boolean;
};

const ModalContent = (props: ModalContentProps) => {
  const {
    children,
    title,
    onClose,
    onSubmit,
    submitButtonLabel = 'Ok',
    isPending = false,
  } = props;

  return (
    <Animated.View entering={FadeIn} style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Ionicons
            name="close"
            onPress={onClose}
            color={DARK_GREY}
            size={16}
            ariaHidden={true}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.main}>{children}</View>
        {onSubmit && (
          <View style={styles.modalFooter}>
            <Button
              mode="contained"
              onPress={onSubmit}
              style={{ backgroundColor: TURQUOISE }}
              labelStyle={{ color: WHITE }}
              uppercase={false}
              loading={isPending}
              disabled={isPending}
            >
              {submitButtonLabel}
            </Button>
          </View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MODAL_OPACITY,
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: 320,
    padding: 24,
    backgroundColor: 'rgba(28, 35, 44, 0.85);',
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
  title: {
    color: WHITE,
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 16,
  },
  main: {
    borderColor: '#2F3945',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});

export default ModalContent;
