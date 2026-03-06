import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import AddCategoryButton from '@/src/components/AddCategoryButton';
import { useDeleteCategory } from '@/src/hooks/categories';
import { Category } from '@/src/types';
import CategoryBanner from './CategoryBanner';

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList(props: CategoryListProps) {
  const { categories } = props;
  const { categoryId } = useLocalSearchParams();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();

  const router = useRouter();

  const handleDelete = (id: string) => {
    deleteCategoryMutation(id);
  };

  return (
    <View style={styles.list}>
      <View style={styles.actions}>
        <AddCategoryButton />
      </View>
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
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 24,
    paddingTop: 32,
  },
});
