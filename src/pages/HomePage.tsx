import Categories from '../containers/categories';
import PageWrapper from '../containers/page/PageWrapper';
import { useSupabaseSession } from '../hooks/auth';
import AuthPage from './AuthPage';

function HomePage() {
  const { data } = useSupabaseSession();

  return (
    <PageWrapper>{data?.user ? <Categories /> : <AuthPage />}</PageWrapper>
  );
}

export default HomePage;
