import { StyleSheet, Text } from 'react-native';

type LabelProps = {
  label: string;
  nativeId: string;
};

const Label = (props: LabelProps) => {
  const { label, nativeId } = props;

  return (
    <Text style={styles.label} nativeID={nativeId}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#B6C2CF',
    marginBottom: 8,
  },
});

export default Label;
