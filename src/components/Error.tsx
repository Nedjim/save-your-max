import { StyleSheet, Text, View } from 'react-native';
import { DEFAULT_CONTAINER_BACKGROUND, WHITE } from '../constants/colors';

type ErrorProps = {
  message: string;
};
const Error = (props: ErrorProps) => {
  const { message } = props;

  return (
    <View style={styles.error}>
      <Text style={[styles.text, styles.title]}>
        Oups! Something went wrong...
      </Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    backgroundColor: DEFAULT_CONTAINER_BACKGROUND,
    padding: 40,
    marginTop: 40,
  },
  text: {
    color: WHITE,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
});

export default Error;
