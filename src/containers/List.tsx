import { useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import IconButton from '../components/IconButton';
import ItemBanner from '../components/ItemBanner';
import { DATA } from '../services';
import AddSectionItemModal from './AddSectionItemModal';
import Item from './Item';

const List = () => {
  const data = DATA;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const selectedSection = data.find((e) => e.id === selectedId);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.list}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { id, title } }) => {
          return (
            <ItemBanner
              title={title}
              isSelected={selectedId === id}
              onPress={() =>
                selectedId === id ? setSelectedId(undefined) : setSelectedId(id)
              }
            />
          );
        }}
        renderItem={({ section: { id }, item }) => {
          if (id !== selectedId) {
            return null;
          }

          return <Item item={item} key={item.id} />;
        }}
        renderSectionFooter={({ section: { id } }) => {
          if (id !== selectedId) {
            return null;
          }

          return (
            <View style={styles.footer}>
              <IconButton name="plus" onPress={openModal} type="secondary" />
            </View>
          );
        }}
        extraData={selectedId}
      />
      {selectedSection && (
        <AddSectionItemModal
          visible={modalVisible}
          closeModal={closeModal}
          selectedSection={selectedSection}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  footer: {
    marginTop: 8,
  },
});

export default List;
