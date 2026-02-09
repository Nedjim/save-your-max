import { useState } from 'react';
import { View } from 'react-native';
import IconButton from '../components/IconButton';
import AddCategoryModal from './categories/AddCategoryModal';

const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <IconButton name="plus" onPress={openModal} type="primary" size={16} />
      <AddCategoryModal visible={modalVisible} closeModal={closeModal} />
    </View>
  );
};

export default Footer;
