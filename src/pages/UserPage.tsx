import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Error from '../components/Error';
import { WHITE } from '../constants/colors';
import PageWrapper from '../containers/page/PageWrapper';
import UserAccount from '../containers/userAccount';
import { useProfile } from '../hooks/profile';

function UserPage() {
  const { data, isLoading, isError, error } = useProfile();

  let content = null;

  if (isLoading) {
    content = <ActivityIndicator size="large" color={WHITE} />;
  }

  if (!isLoading && isError) {
    content = <Error message={error.message} />;
  }

  if (!isLoading && !isError && !data) {
    content = <View>Empty state</View>;
  }

  return (
    <PageWrapper>
      {content ? content : data && <UserAccount profile={data} />}
    </PageWrapper>
  );
}

export default UserPage;
