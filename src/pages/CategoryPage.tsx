import { StyleSheet, Text } from 'react-native';
import { LIGHT_GREY } from '../constants/colors';
import Items from '../containers/items';
import PageWrapper from '../containers/page/PageWrapper';
import { useCategoryNameParams } from '../hooks/categories';

export default function CategoryPage() {
  const categoryName = useCategoryNameParams();

  return (
    <PageWrapper>
      <Text style={styles.title}>{categoryName}</Text>
      <Items />
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: LIGHT_GREY,
    fontSize: 20,
    marginBottom: 16,
  },
});
