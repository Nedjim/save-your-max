import { memo } from 'react';
import PageWrapper from '../components/PageWrapper';
import Categories from '../containers/categories';

const HomePage = () => {
  return (
    <PageWrapper>
      <Categories />
    </PageWrapper>
  );
};

export default memo(HomePage);
