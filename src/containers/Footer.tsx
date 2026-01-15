import { useState } from 'react';
import { View } from 'react-native';
import IconButton from '../components/IconButton';
import AddSectionModal from './AddSectionModal';

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
      <IconButton name="plus" onPress={openModal} type="primary" />
      <AddSectionModal visible={modalVisible} closeModal={closeModal} />
    </View>
  );
};

export default Footer;
