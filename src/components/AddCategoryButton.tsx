import { useState } from 'react';
import { Button, View } from 'react-native';
import { TURQUOISE } from '../constants/colors';
import AddCategoryModal from '../containers/categories/AddCategoryModal';

export default function AddCategoryButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Button
        title="New category"
        onPress={openModal}
        color={TURQUOISE}
        accessibilityLabel="New category"
      />
      <AddCategoryModal visible={modalVisible} closeModal={closeModal} />
    </View>
  );
}
