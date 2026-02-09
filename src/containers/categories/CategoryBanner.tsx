import { memo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LIGHT_GREY, MEDIUM_GREY } from '../../constants/colors';
import Alert from '@/src/components/Alert';
import AntDesign from '@expo/vector-icons/AntDesign';

type CategoryBannerProps = {
  title: string;
  id: string;
  onDelete: (id: string) => void;
  isSelected?: boolean;
  onPress?: () => void;
};

const CategoryBanner = (props: CategoryBannerProps) => {
  const { title, id, isSelected = false, onPress, onDelete } = props;
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.banner}>
        <AntDesign
          name={isSelected ? 'caret-up' : 'caret-down'}
          size={12}
          color={LIGHT_GREY}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.options}>
          <AntDesign
            name="close"
            size={14}
            color={LIGHT_GREY}
            onPress={(e) => {
              setAlertVisible(true);
              e.stopPropagation();
            }}
          />
        </View>
      </TouchableOpacity>
      <Alert
        visible={alertVisible}
        onClose={() => {
          setAlertVisible(false);
        }}
        description={`The category ${title} is about to be deleted.`}
        onSubmit={() => {
          onDelete(id);
          setAlertVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: MEDIUM_GREY,
    color: LIGHT_GREY,
  },
  subBanner: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    color: LIGHT_GREY,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
});

export default memo(CategoryBanner);
