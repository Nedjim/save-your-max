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
import { Item, ItemModalMode } from '@/src/types';
import ItemModal from './ItemModal';
import ItemRow from './ItemRow';

const Items = () => {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { mutate: deleteItemMutation } = useDeleteItem(categoryId);
  const { data: items = [], isLoading, isError, error } = useItems(categoryId);

  const [modalMode, setModalMode] = useState<ItemModalMode | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  const handleSetAction = (mode: ItemModalMode, item?: Item) => {
    setModalMode(mode);
    item && setSelectedItem(item);
  };

  const handleDeleteItem = () => {
    selectedItem &&
      deleteItemMutation(selectedItem.id, {
        onSuccess: () => {
          setSelectedItem(null);
        },
      });
  };

  return (
    <View>
      {items.length === 0 && (
        <EmptyState
          description="No items found in this category."
          buttonTitle="Create a new item"
          onPressButton={() => {
            setModalMode('CREATE');
          }}
        />
      )}
      {items.length > 0 && (
        <View>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ItemRow item={item} onsSetAction={handleSetAction} />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.options}>
            <IconButton
              name="plus"
              onPress={() => {
                setModalMode('CREATE');
              }}
              type="default"
            />
            <Text>Add</Text>
          </View>
        </View>
      )}

      {(modalMode === 'CREATE' || modalMode === 'UPDATE') && (
        <ItemModal
          resetMode={() => {
            setModalMode(null);
          }}
          mode={modalMode}
          item={modalMode === 'UPDATE' ? selectedItem : null}
        />
      )}

      {modalMode === 'DELETE' && (
        <Alert
          visible={!!selectedItem}
          onClose={() => {
            setSelectedItem(null);
          }}
          description="This item is about to be deleted."
          onSubmit={handleDeleteItem}
        />
      )}
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
