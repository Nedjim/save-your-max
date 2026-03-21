import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import {
  DEFAULT_CONTAINER_BACKGROUND,
  TURQUOISE,
  WHITE,
} from '../constants/colors';

type EmptyStateType = {
  description: string;
  buttonTitle: string;
  onPressButton: () => void;
};

function EmptyState(props: EmptyStateType) {
  const { description, buttonTitle, onPressButton } = props;

  return (
    <View style={styles.emptyState}>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.actions}>
        <Button
          onPress={onPressButton}
          buttonColor={TURQUOISE}
          accessibilityLabel={buttonTitle}
          uppercase={false}
          textColor={WHITE}
        >
          {buttonTitle}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 24,
    borderRadius: 4,
    gap: 42,
  },
  description: {
    textAlign: 'center',
    color: WHITE,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default EmptyState;
