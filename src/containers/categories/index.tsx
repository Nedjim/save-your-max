import { router, useLocalSearchParams } from 'expo-router';
import { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCategories, useDeleteCategory } from '../../hooks/categories';
import Items from '../items';
import CategoryBanner from './CategoryBanner';

const Categories = () => {
  const { data: categories = [], isLoading, isError, error } = useCategories();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();
  const { categoryId } = useLocalSearchParams();

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
        keyExtractor={(category) => category.id}
        renderItem={({ item: category }) => {
          const { id, title } = category;
          const isSelected = categoryId === id;

          return (
            <View>
              <CategoryBanner
                title={title}
                id={id}
                isSelected={isSelected}
                onPress={() => {
                  if (isSelected) {
                    router.setParams({ categoryId: undefined });
                  } else {
                    router.setParams({ categoryId: id });
                  }
                }}
                onDelete={handleDelete}
              />
              {isSelected && <Items />}
            </View>
          );
        }}
        extraData={categoryId}
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
