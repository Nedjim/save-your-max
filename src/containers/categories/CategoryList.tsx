import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, View } from 'react-native';
import { TURQUOISE } from '@/src/constants/colors';
import { useDeleteCategory } from '@/src/hooks/categories';
import { Category } from '@/src/types';
import CategoryModal from './CategoryModal';
import CategoryRow from './CategoryRow';

type CategoryListProps = {
  categories: Category[];
};

export default function CategoryList(props: CategoryListProps) {
  const { categories } = props;
  const { categoryId } = useLocalSearchParams();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    deleteCategoryMutation(id);
  };

  return (
    <View style={styles.list}>
      <View style={styles.actions}>
        <Button
          title="New category"
          onPress={openModal}
          color={TURQUOISE}
          accessibilityLabel="New category"
        />
      </View>
      <FlatList
        data={categories}
        keyExtractor={(category) => category.id}
        renderItem={({ item: category }) => {
          const { id, title } = category;
          const name = encodeURIComponent(title.replace(/\s+/g, '_'));

          return (
            <CategoryRow
              title={title}
              id={id}
              onDelete={handleDelete}
              onPress={() => {
                router.push({
                  pathname: '/exercises/[id]',
                  params: { id, name },
                });
              }}
            />
          );
        }}
        extraData={categoryId}
      />
      <CategoryModal visible={modalVisible} closeModal={closeModal} />
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
