import { StyleSheet, Text } from 'react-native';
import { LIGHT_GREY } from '../constants/colors';
import Items from '../containers/items';
import PageWrapper from '../containers/page/PageWrapper';
import { useSupabaseSession } from '../hooks/auth';
import { useCategoryNameParams } from '../hooks/categories';
import AuthPage from './AuthPage';

export default function CategoryPage() {
  const categoryName = useCategoryNameParams();
  const { data } = useSupabaseSession();

  return (
    <PageWrapper>
      {data?.user ? (
        <>
          <Text style={styles.title}>{categoryName}</Text>
          <Items />
        </>
      ) : (
        <AuthPage />
      )}
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
