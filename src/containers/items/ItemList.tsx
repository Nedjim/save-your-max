import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import Alert from '@/src/components/Alert';
import { TURQUOISE } from '@/src/constants/colors';
import { useDeleteItem } from '@/src/hooks/items';
import { Item } from '@/src/types';
import ItemModal from './ItemModal';
import ItemRow from './ItemRow';

type ItemListProps = {
  items: Item[];
};

const ItemList = (props: ItemListProps) => {
  const { items } = props;
  const { id: categoryId } = useLocalSearchParams<{ id: string }>();
  const { mutate: deleteItemMutation } = useDeleteItem(categoryId);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [updatedItem, setUpdatedItem] = useState<Item | null>(null);

  const onCreate = () => {
    setShowModal(true);
  };

  const onUpdate = (item: Item) => {
    setUpdatedItem(item);
    setShowModal(true);
  };

  const onDelete = (item: Item) => {
    setUpdatedItem(item);
    setShowAlert(true);
  };

  return (
    <View style={styles.itemsContent}>
      <View style={styles.actions}>
        <Button
          title="New item"
          onPress={onCreate}
          color={TURQUOISE}
          accessibilityLabel="New item"
        />
      </View>
      <FlatList
        data={items}
        style={styles.itemsList}
        renderItem={({ item }) => {
          return (
            <ItemRow item={item} onUpdate={onUpdate} onDelete={onDelete} />
          );
        }}
        keyExtractor={(item) => item.id}
      />
      {showModal && (
        <ItemModal
          item={updatedItem}
          onClose={() => {
            setShowModal(false);
            updatedItem && setUpdatedItem(null);
          }}
        />
      )}
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
            updatedItem && setUpdatedItem(null);
          }}
          description="This item is about to be deleted."
          onSubmit={() => {
            updatedItem &&
              deleteItemMutation(updatedItem.id, {
                onSuccess: () => {
                  setShowAlert(false);
                },
              });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemsContent: {
    flex: 1,
  },
  itemsList: {
    flex: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
});

export default ItemList;
