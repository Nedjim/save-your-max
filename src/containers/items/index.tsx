import { useLocalSearchParams } from 'expo-router';
import { memo, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Alert from '@/src/components/Alert';
import EmptyState from '@/src/components/EmptyState';
import { TURQUOISE } from '@/src/constants/colors';
import { useDeleteItem, useItems } from '@/src/hooks/items';
import { Item, ItemModalMode } from '@/src/types';
import ItemModal from './ItemModal';
import ItemRow from './ItemRow';

const Items = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { mutate: deleteItemMutation } = useDeleteItem(id);
  const { data: items = [], isLoading, isError, error } = useItems(id);

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
    <View style={styles.categoryPage}>
      {items.length === 0 && (
        <EmptyState
          description="You don’t have any items yet. Create your first one to get started."
          buttonTitle="New item"
          onPressButton={() => {
            setModalMode('CREATE');
          }}
        />
      )}
      {items.length > 0 && (
        <View style={styles.itemsContent}>
          <View style={styles.options}>
            <Button
              title="New item"
              onPress={() => {
                setModalMode('CREATE');
              }}
              color={TURQUOISE}
              accessibilityLabel="New item"
            />
          </View>
          <FlatList
            data={items}
            style={styles.itemsList}
            renderItem={({ item }) => (
              <ItemRow item={item} onsSetAction={handleSetAction} />
            )}
            keyExtractor={(item) => item.id}
          />
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
  categoryPage: {
    flex: 1,
  },
  itemsContent: {
    flex: 1,
  },
  itemsList: {
    flex: 1,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
});

export default memo(Items);
