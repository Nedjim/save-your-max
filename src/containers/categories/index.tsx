import { useLocalSearchParams, useRouter } from 'expo-router';
import { memo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCategories, useDeleteCategory } from '../../hooks/categories';
import CategoryBanner from './CategoryBanner';
import EmptyCategories from './EmptyCategories';

const Categories = () => {
  const { data: categories = [], isLoading, isError, error } = useCategories();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();
  const { categoryId } = useLocalSearchParams();
  const router = useRouter();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error: {(error as Error).message}</Text>;
  }

  if (categories.length === 0) {
    return <EmptyCategories />;
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
          const name = encodeURIComponent(title.replace(/\s+/g, '_'));

          return (
            <CategoryBanner
              title={title}
              id={id}
              onDelete={handleDelete}
              onPress={() => {
                router.push({
                  pathname: '/category/[id]',
                  params: { id, name },
                });
              }}
            />
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
