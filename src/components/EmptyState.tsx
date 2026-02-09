import { memo } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TURQUOISE, WHITE } from '../constants/colors';

type EmptyStateType = {
  description: string;
  buttonTitle: string;
  onPressButton: () => void;
};

const EmptyState = (props: EmptyStateType) => {
  const { description, buttonTitle, onPressButton } = props;

  return (
    <View style={styles.emptyState}>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actions}>
        <Button
          title={buttonTitle}
          onPress={onPressButton}
          color={TURQUOISE}
          accessibilityLabel={buttonTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    backgroundColor: WHITE,
    padding: 24,
    paddingBottom: 8,
    borderRadius: 4,
    gap: 16,
  },
  description: {
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default memo(EmptyState);
