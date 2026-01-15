import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, LIGHT_GREY, TURQUOISE } from '../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

type IconTypes = 'plus' | 'close' | 'down' | 'up';

type IconButtonProps = {
  name: IconTypes;
  onPress?: () => void;
  type?: 'default' | 'primary' | 'secondary';
  color?: string;
  size?: number;
};

const IconButton = (props: IconButtonProps) => {
  const { onPress, name, type = 'default', size = 16, color = BLACK } = props;

  return (
    <View style={styles.section}>
      <Pressable style={[styles.button, styles[type]]} onPress={onPress}>
        <Text style={styles.icon}>
          <AntDesign name={name} size={size} color={color} />
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  button: {
    width: 35,
    padding: 8,
    borderRadius: 100,
    elevation: 2,
  },
  default: {},
  primary: {
    backgroundColor: TURQUOISE,
  },
  secondary: {
    backgroundColor: LIGHT_GREY,
  },
  icon: {
    textAlign: 'center',
  },
});

export default IconButton;
