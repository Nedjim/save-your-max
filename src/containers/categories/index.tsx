import { memo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCategories, useDeleteCategory } from '../../hooks/categories';
import CategoryBanner from './CategoryBanner';

const Categories = () => {
  const { data: categories = [], isLoading, isError, error } = useCategories();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  if (categories.length === 0) {
    return <Text>Categories empty</Text>;
  }

  const handleDelete = (id: string) => {
    deleteCategoryMutation(id);
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { id, title } = item;

          return (
            <CategoryBanner
              title={title}
              id={id}
              isSelected={selectedId === id}
              onPress={() =>
                selectedId === id ? setSelectedId(null) : setSelectedId(id)
              }
              onDelete={handleDelete}
            />
          );
        }}
        extraData={selectedId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default memo(Categories);
