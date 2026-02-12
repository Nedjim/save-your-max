import { Pressable, StyleSheet, View } from 'react-native';
import { BLACK, LIGHT_GREY, TURQUOISE } from '../constants/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

type IconTypes = 'plus' | 'edit' | 'close' | 'down' | 'up';

type IconButtonProps = {
  name: IconTypes;
  onPress?: () => void;
  type?: 'default' | 'primary' | 'secondary';
  color?: string;
  size?: number;
};

const IconButton = (props: IconButtonProps) => {
  const { onPress, name, type = 'default', size = 10, color = BLACK } = props;

  return (
    <View style={styles.section}>
      <Pressable style={[styles.button, styles[type]]} onPress={onPress}>
        <AntDesign name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    padding: 6,
    borderRadius: 40,
    elevation: 2,
  },
  default: {},
  primary: {
    backgroundColor: TURQUOISE,
  },
  secondary: {
    backgroundColor: LIGHT_GREY,
  },
});

export default IconButton;
