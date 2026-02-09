import { memo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Alert from '@/src/components/Alert';
import IconButton from '@/src/components/IconButton';
import { useDeleteItem, useItems } from '@/src/hooks/items';
import AddItemModal from './AddItemModal';
import ItemRow from './ItemRow';

type ItemsProps = {
  categoryId: string;
};

const Items = (props: ItemsProps) => {
  const { categoryId } = props;
  const { mutate: deleteItemMutation } = useDeleteItem(categoryId);
  const { data: items = [], isLoading, isError, error } = useItems(categoryId);

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (items.length === 0) {
    return (
      <View>
        <Text>No items found.</Text>
        <View style={styles.options}>
          <IconButton name="plus" onPress={openModal} type="default" />
          <Text>Add</Text>
        </View>
        <AddItemModal
          visible={modalVisible}
          closeModal={closeModal}
          categoryId={categoryId}
        />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ItemRow item={item} setDeleteItemId={setDeleteItemId} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.options}>
        <IconButton name="plus" onPress={openModal} type="default" />
        <Text>Add</Text>
      </View>
      <AddItemModal
        visible={modalVisible}
        closeModal={closeModal}
        categoryId={categoryId}
      />
      <Alert
        visible={!!deleteItemId}
        onClose={() => {
          setDeleteItemId(null);
        }}
        description={`The item is about to be deleted.`}
        onSubmit={() => {
          deleteItemId && deleteItemMutation(deleteItemId);
          setDeleteItemId(null);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default memo(Items);
