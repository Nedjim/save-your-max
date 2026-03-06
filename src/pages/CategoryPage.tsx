import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import PageWrapper from '../components/PageWrapper';
import { LIGHT_GREY } from '../constants/colors';
import Items from '../containers/items';

export default function CategoryPage() {
  const { name } = useLocalSearchParams<{ id: string; name: string }>();

  const formattedName = name?.replace(/_+/g, ' ');

  return (
    <PageWrapper>
      <Text style={styles.title}>{formattedName}</Text>
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
