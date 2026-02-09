import { useLocalSearchParams } from 'expo-router';
import { memo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Alert from '@/src/components/Alert';
import EmptyState from '@/src/components/EmptyState';
import IconButton from '@/src/components/IconButton';
import { useDeleteItem, useItems } from '@/src/hooks/items';
import AddItemModal from './AddItemModal';
import ItemRow from './ItemRow';

const Items = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
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
        <EmptyState
          description="No items found in this category."
          buttonTitle="Create a new item"
          onPressButton={openModal}
        />
        <AddItemModal visible={modalVisible} closeModal={closeModal} />
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
      <AddItemModal visible={modalVisible} closeModal={closeModal} />
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
